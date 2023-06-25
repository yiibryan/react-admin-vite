import Loading from '@components/Loading'
import loadable from '@loadable/component'
import {Route, Routes} from 'react-router-dom'
import DocTitle from '@/components/DocTitle';
import {getLeafPath} from '@/utils/index.ts';
const modules = import.meta.glob(['@/pages/**/*.tsx', '@/layouts/*.tsx'])

const getFileName = (path: string)=>{
  if(path.lastIndexOf("\\")>=0){
    const reg=new RegExp("\\\\","g");
    path = path.replace(reg,"/");
  }
  return path.substring(path.lastIndexOf("/")+1);
}

export function renderRouters(routes, switchProps = {}) {
  const renderRoutes = (routes) => {
    const redirectPath = getLeafPath(routes);
    return routes ? routes.map((route, i) => {
      const Component = loadable(() => {
        try{
          for(const path in modules){
            if(route.component.indexOf('layouts') > -1){
              if(path.indexOf(route.component) !== -1){
                return modules[path]()
              }
            }else{
              if(path.indexOf(route.component) !== -1 && path.indexOf(`${route.component}/index.tsx`) !== -1){
                return modules[path]()
              }
            }
          }
        }catch (e) {
          return import('@/pages/ErrorPages/404');
        }
      }, {
        fallback: <Loading />,
      });
      if(route.routes && route.routes.length>0){
        return <Route
          key={route.key || i}
          path={route.path + '/*'}
          element={<Component route={route} />}
        >
          {
            renderRoutes(route.routes)
          }
        </Route>
      }else{
        return <Route
          index={redirectPath===route.path}
          key={route.key || i}
          path={getFileName(route.path)}
          element={<DocTitle route={route} Component={Component}  title={route.title}/>}
        />
      }
    }): null
  }
  return routes ? (
    <Routes {...switchProps}>
      {
        renderRoutes(routes)
      }
    </Routes>
  ) : null;
}
