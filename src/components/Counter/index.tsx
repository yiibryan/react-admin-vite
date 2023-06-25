import { useEffect, useReducer } from 'react'
import {Statistic} from 'antd';

function Counter({ step }) {
  const [count, dispatch] = useReducer(reducer, 0, undefined);

  function reducer(state, action) {
    if (action.type === 'tick') {
      return state + step;
    } else {
      throw new Error();
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (<Statistic title="自增数字" value={count} />);
}


export default Counter;
