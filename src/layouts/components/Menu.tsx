import {memo, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Menu } from 'antd'
import * as Icons from '@ant-design/icons';
import {useLocation} from 'react-use';

const { SubMenu } = Menu;

let currentOpenKey: string [];

export type NavMenuProps = {
  menu?: any;
}

const NavMenu = memo((props: NavMenuProps) => {
  const [openKey, setOpenKey] = useState<string[] | undefined>([]);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {menu} = props

  const handleChangeMenu = ({key}: {key: string}) => {
    navigate(key);
  };

  const handleOpenChange = (v: string []) => {
    currentOpenKey = v;
    setOpenKey(v);
  }

  useEffect(() => {
    setOpenKey(currentOpenKey);
  }, [])

  const createMenuListMap = (list) => {
    return list.map((item) => {
      if(item.meta && item.meta.hidden){
        return null
      }
      const Icon = item.icon && Icons[item.icon] ? Icons[item.icon] : null;
      if(item.routes && item.routes.length>0) {
        // 如果当前循环到的菜单项有 routes，那就返回 SubMenu，否则返回的直接是 Menu.Item
        const path = pathname;
        const res = item.routes.find(child => path? path.indexOf(child.path) >= 0 : false);
        if(res) currentOpenKey = item.path;
        return (
          <SubMenu
            key={item.path}
            title={item.title || item.meta.title}
            icon={item.icon && <Icon />}
          >
            {
              // 根据当前菜单的 routes 去生成其子菜单，由于菜单项 menuList 是个有终结的数据，且嵌套层数并不复杂，所以这里不用担心递归会造成栈溢出的问题
              createMenuListMap(item.routes)
            }
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.path} icon={item.icon && <Icon />}>
            <Link to={item.path}>
              {item.title || item.meta.title}
            </Link>
          </Menu.Item>
        );
      }
    });
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      onClick={handleChangeMenu}
      selectedKeys={pathname ? [pathname] : []}
      onOpenChange={handleOpenChange}
      openKeys={openKey}
    >
      {
        // 获取并渲染动态的菜单内容
        createMenuListMap(menu)
      }
    </Menu>
  )
});
export default NavMenu
