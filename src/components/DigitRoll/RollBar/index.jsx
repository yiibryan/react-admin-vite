import React, {useEffect, useRef, useState} from 'react';
import {easeToCubicMap, supportCssCache} from '@components/DigitRoll/utils';
import PropTypes from 'prop-types';
import useEventListener from '@hooks/useEventListener';
import styles from './rollBar.module.less'

const RollBar = (props) => {
  const {pos, offset, height, easeFn, duration, figure, flip, callback} = props;

  const [itemStyle, setItemStyle] = useState({});

  const transitionPrefix = supportCssCache('transition');
  const transitionEnd =
    typeof transitionPrefix === 'boolean' || transitionPrefix.toLowerCase() === 'moz'
      ? 'transitionend'
      : `${transitionPrefix.toLowerCase()}TransitionEnd`

  let tmpArray = Array.from(new Array(10).keys());
  let twiceArray = tmpArray.concat(tmpArray);
  const transitionFunc = easeToCubicMap[easeFn];

  const barRef = useRef(null);

  const transitionDone = () => {
    let currentState = {...props}
    if (flip) {
      const prePageOffset = height * 10;
      currentState.figure = figure + prePageOffset;
      currentState.noTransition = true;
      currentState.flip = false;
    }
    callback && callback(currentState, pos);
  }

  useEventListener(transitionEnd, transitionDone, barRef.current);

  useEffect(() => {
    const strOffset = offset ? `${-offset}px` : '0px';
    setItemStyle({
      transition: `transform ${duration / 1000}s ${transitionFunc}`,
      transform: `translateY(${strOffset}) translateZ(0)`,
    });
  }, [offset, duration, transitionFunc])

  return (
    <div className={styles.item} style={{height: `${height}px`}}>
      <div className={styles.bar} ref={barRef} style={itemStyle}>
        {
          twiceArray.map((n, i) => (<div className={styles.inner} key={i}>{n}</div>))
        }
      </div>
    </div>
  )
}

export default RollBar;

RollBar.propTypes = {
  offset: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  figure: PropTypes.number,
  flip: PropTypes.bool,
  easeFn: PropTypes.string,
  callback: PropTypes.func
}

RollBar.defaultProps = {
  offset: 0,
  height: 80,
  duration: 1000,
  figure: 0,
  flip: false,
  easeFn: 'Cubic.easeInOut',
  callback: null
}
