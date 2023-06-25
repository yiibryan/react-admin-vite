import React, { useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { BoxHelper, SpotLightHelper, PointLightHelper } from "three"
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper"
// import { FaceNormalsHelper } from "three/examples/jsm/helpers/FaceNormalsHelper"
import { useHelper } from "@react-three/drei"

function Scene() {
  const { scene } = useThree()
  const group = useRef()
  const mesh = useRef()
  const spotLight = useRef()
  const pointLight = useRef()

  useFrame(({ clock }) => {
    mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    mesh.current.position.x = Math.sin(clock.elapsedTime)
    mesh.current.position.z = Math.sin(clock.elapsedTime)
    group.current.rotation.y += 0.02
  })

  useEffect(() => void (spotLight.current.target = mesh.current), [scene])
  useHelper(mesh, BoxHelper, "#272740")
  useHelper(mesh, VertexNormalsHelper, 1, "#272740")
  useHelper(mesh, VertexNormalsHelper, 0.5, "#272740")
  useHelper(spotLight, SpotLightHelper, "teal")
  useHelper(pointLight, PointLightHelper, 0.5, "hotpink")

  return (
    <>
      <pointLight position={[-10, 0, -20]} color="lightblue" intensity={2.5} />
      <group ref={group}>
        <pointLight ref={pointLight} color="red" position={[4, 4, 0]} intensity={5} />
      </group>
      <spotLight castShadow position={[2, 5, 2]} ref={spotLight} angle={0.5} distance={20} />
      <mesh ref={mesh} position={[0, 2, 0]} castShadow>
        <boxGeometry attach="geometry" />
        <meshStandardMaterial color="lightblue" />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow // 接收阴影
      >
        <planeBufferGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.5} />
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

export default function LightContainer() {
  return (
    <Canvas shadows camera={{ position: [-5, 5, 5] }}>
      <fog attach="fog" args={["floralwhite", 0, 20]} />
      <Scene />
    </Canvas>
  )
}
