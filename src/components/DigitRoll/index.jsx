import RollBar from '@components/DigitRoll/RollBar';
import React, {useEffect, useReducer} from 'react';
import styles from './digitRoll.module.less'
import PropTypes from 'prop-types';
import {reducer, init} from './store';

/**
 * DigitRoll component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DigitRoll = (props) => {
  const {count, rollDigits, flipStrategy, maxLen} = props;
  const digitLen = rollDigits.toString().length
  const defaultFlipStrategy = (before, next) => {
    return next < before;
  };

  let executeStrategy = typeof flipStrategy === 'boolean'
    ? () => flipStrategy
    : flipStrategy || defaultFlipStrategy;

  const [store, dispatch] = useReducer(reducer, digitLen, init);

  useEffect(
    () => {
      let tmpRollDigits = `${rollDigits}`;
      let len = tmpRollDigits.length;
      let beforeLen = `${store.beforeDigits}`.length;
      if(len && len > 0 ){
        console.log('useEffect rollDigits', len, beforeLen, rollDigits);
        if (len !== beforeLen) {
          dispatch({type: 'reset', payload: len})
        }else{
          console.log(tmpRollDigits.split(""));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rollDigits]
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {
          store.digitStatArr.map((item, i) =>
            <RollBar {...item} offset={count} key={i} />
          )
        }
      </div>
    </div>
  )
}

export default React.memo(DigitRoll);

DigitRoll.propTypes = {
  rollDigits: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  duration: PropTypes.number,
  flipStrategy: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  easeFn: PropTypes.string,
  maxLen: PropTypes.number
}
DigitRoll.defaultProps = {
  rollDigits: 1000,
  duration: 2000,
  flipStrategy: null,
  easeFn: 'Cubic.easeInOut',
  maxLen: 8
}

