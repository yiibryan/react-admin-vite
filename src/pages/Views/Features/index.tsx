import {Card, Button, Col, Input, InputNumber, Row, Statistic} from 'antd';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Counter from '@components/Counter';
import {useBoolean, useInterval, useThrottleFn} from 'react-use';
import useEventListener from '@/hooks/useEventListener';
import queryString from 'query-string';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';

const Features = () => {
  const [step, setStep] = useState(1);
  const { Countdown } = Statistic;
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const domRef = useRef<HTMLDivElement>(null);

  const [keyword, setKeyword] = useState(null);
  const [url, setUrl] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();


  const [count, setCount] = React.useState(10);
  const [delay, setDelay] = React.useState(1000);
  const [isRunning, toggleIsRunning] = useBoolean(false);

  useInterval(() => {
      if (count <= 1) {
        setCount(10);
        toggleIsRunning(false);
      }else{
        setCount(count - 1);
      }
  }, isRunning ? delay : null);

  useThrottleFn(coords => {
    console.log('points=>', coords.x, '|', coords.y)
  }, 50, [coords]);

  // Add event listener using our hook
  useEventListener("mousemove", (e) => {
    console.log(e);
    // const { offsetX, offsetY } = e
    // setCoords({ x: offsetX, y: offsetY });
    // Update coordinates

    const { clientX, clientY } = e
    setCoords({ x: clientX, y: clientY });

  }, domRef.current!);

  const goto = () => {
    const query = {
      postId: 20
    }
    navigate(`/view/view-2?${queryString.stringify(query)}`, {
      state: {  // location state
        update: true,
      }
    })
  }

  const onKeyDownChange = e => {
    if(e.keyCode === 13){
      setKeyword(e.target.value);
    }
  };

  // ✅ Preserves identity until query changes
  const getFetchUrl = useCallback(() => {
    return keyword? 'https://hn.algolia.com/api/v1/search?query=' + keyword: null;
  }, [keyword]);

  // 只有当query发生变化的时候getFetchUrl才会变化
  useEffect(() => {
    setUrl(getFetchUrl() as string)
  }, [getFetchUrl]);

  return (
    <>
      <Card title={"倒计时"}>
        <Row gutter={24}>
          <Col span={12}>
            <Counter step={step} />
          </Col>
          <Col>
            <p>步长</p>
            <InputNumber min={1} max={10} defaultValue={step} onChange={e => setStep(Number(e))} />
          </Col>
        </Row>
        <Row>
          <Countdown title="倒计时" value={deadline} format="HH:mm:ss" />
        </Row>
      </Card>

      <Card title={"倒计时"} style={{marginTop: '20px'}}>
        <div>
          delay: <input value={delay} onChange={event => setDelay(Number(event.target.value))} />
        </div>
        <div>
          <Button type={'primary'} onClick={toggleIsRunning} disabled={isRunning}>{!isRunning ? '发送' : `${count}s后重试`}</Button>
        </div>
      </Card>

      <Card title={"超链接参数获取"} style={{marginTop: '20px'}}>
        <p>链接：{location.pathname}</p>
        <p>带参：{location.search}</p>
        <p>参数：{searchParams.get('postId')}</p>
        <button onClick={goto}>About</button>
      </Card>

      <Card title={`url动态`} style={{marginTop: '20px'}}>
        <Row>
          <label>Search Fixed:</label>
          <Input type="text" onKeyDown={onKeyDownChange} />
        </Row>
        <Row>
          <label>URI: </label>
          <p><b>{url}</b></p>
        </Row>
      </Card>

      <Card title={`鼠标移动(${coords.x}, ${coords.y})`} style={{marginTop: '20px'}}>
        <div ref={domRef} style={{height: '240px', border: '1px solid #dbdbdb'}}>
        </div>
      </Card>

    </>
  )
}

export default Features;
