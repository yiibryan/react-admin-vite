export const Timestamp = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${date.getMonth()+1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hour = `0${date.getHours()}`.slice(-2);
  const minute = `0${date.getMinutes()}`.slice(-2);
  return `${year}${month}${day}${hour}${minute}`
}

export function timeFix(): string {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function getLocationOrigin() {
  if (!window.location.origin) {
    return (
      window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "")
    );
  }
  return window.location.origin;
}

export function randomNumber(...args) {
  // 生成 最小值 到 最大值 区间的随机数
  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  if (args.length === 1) {
    const [length] = args
    // 生成指定长度的随机数字，首位一定不是 0
    const nums = Array.from(Array(length).keys()).map(i => (i > 0 ? random(0, 9) : random(1, 9)))
    return parseInt(nums.join(''))
  } else if (args.length >= 2) {
    const [min, max] = args
    return random(min, max)
  } else {
    return Number.NaN
  }
}

export function randomString(length: number, chats?: string) {
  if (!length) length = 1
  if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let str = ''
  for (let i = 0; i < length; i++) {
    const num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
 * Get avatar short name from user name
 * @param {string} userName user name
 */
export const getAvatarShortName = (userName: string) => {
  if (!userName) {
    return '';
  }
  const names = userName.toUpperCase().split(' ');
  return names
  .map((n) => (n ? n[0] : ''))
  .slice(0, 2)
  .join('');
};


/**
 * URL地址
 * @param {*} s
 */
export function isURL (s: string) {
  return /^http[s]?:\/\/.*/.test(s)
}

type ItemMenu = {
  path: string;
  name: string;
  redirect: string;
  icon: unknown;
  component: unknown;
  lazy: boolean;
  key: string;
  title: string;
  hidden: boolean;
  meta?: any;
  alwaysShow?: boolean;
  routes?: any [];
}

export function generateChildRouters(data: string | any[], lazy = true) {
  const routers: any [] = []
  if(!data || data.length === 0) return routers;
  for (const item of data) {
    // eslint-disable-next-line
    let URL = (item.url || '').replace(/{{([^}}]+)?}}/g, (_: string, s2: string) => eval(s2)) // URL支持{{ window.xxx }}占位符变量
    if (isURL(URL)) {
      item.url = URL
    }
    const menu: ItemMenu = {
      path: item.menuUrl,
      name: item.menuName,
      redirect: item.redirect || null,
      icon: item.menuIcon || null,
      component: item.reComponent,
      lazy,
      key: item.menuId || null,
      title: item.menuName,
      hidden: !!item.hidden,
      ...(item.meta && {meta: item.meta})
    }
    if (item.alwaysShow) {
      menu.alwaysShow = true
      menu.redirect = menu.path
    }
    if (item.subMenu && item.subMenu.length > 0) {
      menu.routes = [...generateChildRouters(item.subMenu)]
    }
    //判断是否生成路由
    if (!item.route || item.route !== '0') {
      routers.push(menu)
    }
  }
  return routers
}

export const getLeafPath = (menus: any [] | any, children ="routes", key: string|number="path")=>{
  if(menus && Array.isArray(menus) && menus.length>0 ){
    if(menus[0][children]){
      getLeafPath(menus[0][children], children, key)
    }else{
      return menus[0][key]
    }
  }else{
    return menus[key]
  }
}

