import React from "react";
import { BackSide } from "three";

const Environment = () => {
  return (
    <mesh>
      <sphereBufferGeometry args={[5, 10, 10]} />
      <meshStandardMaterial
        color={0xd2452b}
        side={BackSide}
        metalness={0.4}
      />
    </mesh>
  );
};

export default Environment;
