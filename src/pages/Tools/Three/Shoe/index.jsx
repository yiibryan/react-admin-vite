import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { BakeShadows, OrbitControls, Stage } from '@react-three/drei'
import Shoe from './Shoe'

/*
Stage environment 会请求 https://rawcdn.githack.com/pmndrs/drei-assets/aa3600359ba664d546d05821bcbca42013587df2/hdri/
* */
export default function Viewer() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 40 }}>
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.5} contactShadowOpacity={0.6} contactShadowBlur={1}>
          <Shoe position={[0, 0, 0]} />
          <Shoe scale={-1} rotation={[0, 0.5, Math.PI]} position={[0, 0, -2]} />
        </Stage>
        <BakeShadows />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
