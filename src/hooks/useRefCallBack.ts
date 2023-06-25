import { useCallback, useRef } from 'react'

/**
 * 防止传递依赖性，方便简单又好用
 * @param callback
 * @returns {function(...[*]): *}
 */
export function useRefCallback(callback){
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  return useCallback((...args) => callbackRef.current(...args), [])
}

/*
 // 获取当前「标题」和「内容」的长度
 const getTextLen = useRefCallback(() => {
    return [title.length, content.length];
 });

 // 上报当前「标题」和「内容」的长度
 const report = useRefCallback(() => {
   const [titleLen, contentLen] = getTextLen();
   if (contentLen > 0) {
    console.log(`埋点 >>> O长度 ${titleLen}, kr长度${contentLen}`);
   }
 });

 // 当「标题」长度变化时，上报
 useEffect(() => {
    report();
 }, [title, report]);
*/
