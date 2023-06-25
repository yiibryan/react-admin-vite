import React from 'react'

const FakeSphere = () => {
  return (
    <mesh>
      <sphereBufferGeometry args={[0.7, 30, 30]} />
      <meshBasicMaterial color={0xfff1ef} />
    </mesh>
  );
};

const Lights = () => {
  return (
    <group>
      <FakeSphere />
      <ambientLight intensity={0.7} />
      <pointLight intensity={1.12} position={[0, 10, 10]} />
    </group>
  );
};
export default Lights;
