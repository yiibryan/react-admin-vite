import React, { useRef, useState } from 'react'
import { useThrottleFn } from 'react-use'
import useEventListener from '@/hooks/useEventListener'

function MouseContainer() {
  // State for storing mouse coordinates
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const domRef = useRef();

  useThrottleFn(coords => {
    console.log('points=>', coords.x, '|', coords.y)
  }, 50, [coords]);

  // Add event listener using our hook
  useEventListener("mousemove", ({ clientX, clientY }) => {
    // Update coordinates
    setCoords({ x: clientX, y: clientY });
  }, domRef.current);

  return (
    <div ref={domRef} style={{height: '300px', border: '1px solid #333'}}>
      <h1>
        The mouse position is ({coords.x}, {coords.y})
      </h1>
    </div>
  );
}

export default MouseContainer;
