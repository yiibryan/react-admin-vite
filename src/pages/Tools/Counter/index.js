import React, { memo, useState } from 'react'
import Counter from '@/components/Counter'

const CounterContainer = () => {
  const [step, setStep] = useState(1);
  return (
    <>
      <Counter step={step} />
      <input value={step} onChange={e => setStep(Number(e.target.value))} />
    </>
  );
}

export default memo(CounterContainer);
