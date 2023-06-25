import {
  BellOutlined,
  BulbOutlined,
  CaretDownFilled,
  ClearOutlined,
  SettingOutlined,
  TranslationOutlined,
  UserOutlined
} from '@ant-design/icons'
import {Link, useNavigate} from 'react-router-dom'
import {Menu, Popover} from 'antd'
import gjLogo from '@assets/img/logo-guojiu.png'
// import IconExit from '@assets/icons/exit.svg'
import {ACCESS_TOKEN, ACCESS_USER_INFO} from '@utils/constant'
import {logOut} from '@/api'
import './Header.less'
import {useTranslation} from 'react-i18next';
import {useCallback, useState} from 'react';
import SvgIcon from "@components/SvgIcon";


export type LogoProps = {
  logo: string;
  title: string;
};

const Logo = (props: LogoProps) => {
  const {logo, title} = props
  return (
    <div className="logo-wrapper">
      <Link to='/' className="logo-hyperlink">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <span className="logo-title">{title}</span>
    </div>
  )
}

export type AvatarMenuProps = {
  avatar: string;
  fullName: string;
  username: string;
  role: string;
};
const AvatarMenu = (props: AvatarMenuProps) => {
  const {avatar, fullName, username, role } = props;
  return (
    <div className="user-dropdown-wrapper">
      <div className="user-info-bar">
        <div className="avatar">
          {
            avatar ? <img src={avatar} alt={fullName} /> : <UserOutlined />
          }
        </div>
        <div className="user-info">
          <div className="user-info-ceil">{username}</div>
          <div className="user-info-ceil">{role || '管理员'}</div>
        </div>
      </div>
      <ul className="user-dropdown-menus">
        <li><Link className="user-dropdown-menu" to='/'><UserOutlined /> 个人中心</Link></li>
        <li><Link className="user-dropdown-menu" to='/'><SettingOutlined/> 设置</Link></li>
        <li><Link className="user-dropdown-menu" to='/'><ClearOutlined /> 清理缓存</Link></li>
      </ul>
    </div>
  )
}

export type TranslationContentProps = {
  hide: () => void;
};
const TranslationContent: React.FC<TranslationContentProps> = (props) => {
  const {hide} = props;
  const { i18n } = useTranslation();
  const changeLanguage = async ({key}:{key: string}) => {
    await i18n.changeLanguage(key);
    hide();
  }
  const items = [
    { label: 'English', key: 'en_US' },
    { label: '中文', key: 'zh_CN' }
  ];
  return (
    <Menu items={items} onClick={changeLanguage} />
  )
}

export type NotificationContentProps = {
  list: Array<{message: string, date: string}>;
};
const NotificationContent: React.FC<NotificationContentProps> = props => {
  const {list} = props;
  return (
    <div className="notification-wrapper">
      <header className="notification-header">
        <div className="notification-header-left">
          <BellOutlined className="icon-bell"/> <h3 className="title">消息</h3>
        </div>
        <div className="notification-clean">
          <ClearOutlined /> <span className="text">全部已读</span>
        </div>
      </header>
      <ul className="notification-list">
        {
          list && list.map((item, index) => {
            return (
              <li key={index}>
                <div className="message-summary"><Link to="/register">{item.message}</Link></div>
                <div className="message-date">{item.date}</div>
              </li>
            )
          })
        }
      </ul>
      <div className="notification-bottom-bar">
        <span className="hyperlink-view-all">查看全部</span>
      </div>
    </div>
  )
}

export const Header = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem(ACCESS_USER_INFO)||'')
  const list: {message: string, date: string} [] = [
    {
      message: '123',
      date: '2021-11-03 09:32:32'
    },
    {
      message: '测试消息2测试消息2测试消息2测试消息2测试消息2测试消息2',
      date: '2021-11-03 11:24:11'
    },
    {
      message: '测试消息2测试消息2测试消息2测试消息2测试消息2测试消息2',
      date: '2021-11-03 11:24:11'
    }
  ]

  const loginOut = () => {
    logOut().then((res: any) => {
      if (res && res.success) {
        navigate('/login')
      } else {
        clearStorage()
      }
    })
  }

  const clearStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    window.location.reload()
  }

  const hideLanguage = useCallback(() => {
    setVisible(false);
  }, [])

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  }

  return (
    <>
      <Logo title={import.meta.env.VITE_GLOB_APP_TITLE} logo={gjLogo} />

      <div className="user-info">
        <BulbOutlined className="icon-header" />
        <Popover
          overlayClassName={'custom-notification'}
          placement="bottom"
          open={visible}
          trigger={['click']}
          onOpenChange={handleVisibleChange}
          content={<TranslationContent hide={hideLanguage} />}>
          <TranslationOutlined  className="icon-header" />
        </Popover>

        <Popover overlayClassName={'custom-notification'} placement="bottomRight" trigger="click" content={<NotificationContent list={list} />}>
          <BellOutlined className="icon-header notification active" />
        </Popover>
        {
          userInfo &&
          (
            <>
              <Popover overlayClassName={'custom-avatar-popup'} placement="bottomRight" trigger="click" content={<AvatarMenu {...userInfo} />}>
                <div className="wrapper-avatar">
                  <div className="avatar">
                    {/*{
                      userInfo.avatar ? <img src={userInfo.avatar} alt={userInfo.fullName} /> : <UserOutlined />
                    }*/}
                    <UserOutlined />
                  </div>
                  <span className="username">{userInfo.fullName} <CaretDownFilled className='icon-dropdown' /></span>
                </div>
              </Popover>
              <div className="exit" onClick={loginOut}>
                <SvgIcon name="exit"></SvgIcon>
                {/*<Icon component={} />*/}
              </div>
            </>
          )
        }
      </div>
    </>
  )
}
