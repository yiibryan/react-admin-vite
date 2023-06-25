import {useEffect, useState} from 'react';
import {InputNumber} from 'antd';
import "./index.less"

const FluidImage = () => {
  const [num, setNum] = useState(1);
  const [list, setList] = useState<number[]>([]);

  useEffect(()=>{
    const number = parseInt(num);
    if(number && number >0){
      const temArr = Array.from(new Array(number+1).keys()).slice(-number);
      setList(temArr);
    }
  }, [num]);

  const onChange = (value) => {
    setNum(value)
  }

  return (
    <>
      <div className="top-bar">
        显示数量: <InputNumber min={1} max={10} defaultValue={num} onChange={onChange} /> 个
      </div>
      <ul className="fluid-list">
        {
          list.map((item, index) =>
            (
              <li key={index}>
                <div className="scale">
                  <div className="item">{item}</div>
                </div>
              </li>
            )
          )
        }
      </ul>
    </>

  )
}

export default FluidImage;
