import {Canvas} from '@react-three/fiber'
import {useRef, Suspense} from 'react'
import Stacy from "./Stacy"

function Plane({ ...props }) {
  return (
    <mesh {...props} receiveShadow>
      <planeBufferGeometry args={[500, 500, 1, 1]} />
      <shadowMaterial transparent opacity={0.2} />
    </mesh>
  )
}

const StacyModel = () => {
  const d = 8.25
  const mouse = useRef({ x: 0, y: 0 })
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, -3, 18] }}>
      <hemisphereLight skyColor={"black"} groundColor={0xffffff} intensity={0.5} position={[0, 50, 0]} />
      <directionalLight
        position={[-8, 20, 8]}
        shadow-camera-left={d * -1}
        shadow-camera-bottom={d * -1}
        shadow-camera-right={d}
        shadow-camera-top={d}
        shadow-camera-near={0.1}
        shadow-camera-far={1500}
        castShadow
      />
      <mesh position={[0, 0, -10]}>
        <circleBufferGeometry args={[8, 64]} />
        <meshBasicMaterial color="lightpink" />
      </mesh>
      <Plane rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -10, 0]} />
      <Suspense fallback={null}>
        <Stacy mouse={mouse} position={[0, -10, 0]} scale={[0.08, 0.08, 0.08]} />
      </Suspense>
    </Canvas>
  )
}

export default StacyModel;
