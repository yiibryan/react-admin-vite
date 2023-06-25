import React, {useState} from 'react';
import DigitRoll from '@components/DigitRoll';
import {useSetInterval} from '@/hooks/useSetInterval';

function getRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function DigitRollContainer() {
  const [digits] = useState(1233332)
  const [count, setCount] = useState(0);
  const test = () => {
    const nextNumber = 80 * getRandomNumber(0, 9)
    console.log('test====>', nextNumber);
    //   this.digits += getRandomNumber(1, 1000)
    setCount(nextNumber);
  };

  const duration = 3000

  useSetInterval(test, duration);

  return (
    <DigitRoll rollDigits={digits} count={count} duration={duration} />
  );
}

export default React.memo(DigitRollContainer);
