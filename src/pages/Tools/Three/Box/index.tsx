import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/three'
import {OrbitControls} from '@react-three/drei'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<any>()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({clock}) => {
    if(mesh.current){
      const a = clock.getElapsedTime();
      // mesh.current.rotation.x = mesh.current.rotation.y += 0.01
      mesh.current.rotation.x = mesh.current.rotation.y = a
    }
  })
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const BoxAnimation = (props) => {
  const [active, setActive] = useState(0)

  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })

  // interpolate values from common spring
  const scale = spring.to([0, 1], [1, 2])
  const rotation = spring.to([0, 1], [0, Math.PI])
  const color = spring.to([0, 1], ['#6246ea', '#e45858'])

  return (
    <animated.group position-y={scale} {...props}>
      <animated.mesh rotation-y={rotation} scale-x={scale} scale-z={scale} onClick={() => setActive(Number(!active))}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <animated.meshStandardMaterial roughness={0.5} attach="material" color={color} />
      </animated.mesh>
    </animated.group>
  )
}

export default function BoxContainer() {
  return (
    <Canvas camera={{ position: [-10, 10, 10], fov: 35 }}>
      {/*<scene />*/}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-1.5, 0, 0]} />
      <Box position={[1.5, 0, 0]} />
      <BoxAnimation position={[0, 1, 0]} />
      <OrbitControls />
    </Canvas>
  )
}
