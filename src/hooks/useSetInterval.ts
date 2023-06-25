import {useEffect, useRef} from 'react';

export function useSetInterval(callback, delay) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }
    let timerId:any = null;
    const run = () => {
      const returnValue = savedCallback.current();
      if (returnValue) {
        if (returnValue instanceof Function) {
          returnValue();
        } else {
          throw new Error("返回值必须是函数！");
        }
        timerId && clearTimeout(timerId);
        return;
      }
      timerId = setTimeout(run, delay);
    };

    timerId = setTimeout(run, delay);
    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [delay]);
}
