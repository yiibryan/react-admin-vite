import NavMenu from '@/layouts/components/Menu'
import {routers} from '@/routes'
import {generateChildRouters} from '@/utils'
import {renderRouters} from '@/utils/renderRoutes'
import ErrorBoundary from '@/components/ErrorBoundary'
import {ACCESS_TOKEN, LAYOUT_SIDEBAR_WIDTH, RESIZE_THROTTLE} from '@/utils/constant'
import {Layout} from 'antd'
import {memo, useEffect} from 'react'
import {throttle} from 'throttle-debounce'
import useResizeObserver from 'use-resize-observer'
import {Header} from '@/layouts/components/Header'
import './BasicLayout.less'
import {useLocation, useNavigate} from 'react-router-dom';

const BasicLayout = memo(() => {
  const location = useLocation()
  const {pathname, search} = location;
  const navigate = useNavigate()
  const routes = generateChildRouters(routers);
  const access = localStorage.getItem(ACCESS_TOKEN);

  const onResize = throttle(RESIZE_THROTTLE, (e) => {
    console.log('onResize', e)
  })

  const { ref } = useResizeObserver({ onResize })

  useEffect(() => {
    if (!access) {
      const searchParams = (pathname !== '/' || !!search)
        && `?redirect=${encodeURIComponent(pathname + search)}`;
      const path = '/login' + searchParams;
      // console.log(path, searchParams, location);
      navigate(path, {replace: true});
    }
  }, [access, navigate, pathname, search])

  return (
    <Layout>
      <Layout.Header className="header">
        <Header/>
      </Layout.Header>
      <Layout>
        <Layout.Sider theme="light" width={LAYOUT_SIDEBAR_WIDTH}>
          <NavMenu menu={routes} />
        </Layout.Sider>
        <Layout.Content className="main-container">
          <div ref={ref} style={{ height: '100%' }}>
            <ErrorBoundary location={location}>
              {renderRouters(routes)}
            </ErrorBoundary>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
})

export default BasicLayout
