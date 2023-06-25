/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import {useGLTF} from '@react-three/drei'
import {useSpring} from '@react-spring/core';
import { a } from '@react-spring/three'
import {useState} from 'react';

useGLTF.preload('/assets/models/gltf/shoe.gltf')

export default function Shoe(props) {
  const [active, setActive] = useState(0)

  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })
  // const rotation = spring.to([0, 1], [0, Math.PI])
  const scale = spring.to([0, 1], [1, 2])
  // const scale2 = spring.to([0, 1], [1, 2])
  // const {nodes, materials} = useLoader(GLTFLoader, "./shoe.gltf")
  const {nodes, materials} = useGLTF('/assets/models/gltf/shoe.gltf')

  const handleClick = (e) => {
    console.log(e, '2');
    setActive(Number(!active))
  }

  return (
    <group {...props} dispose={null} onClick={handleClick} >
      <mesh castShadow receiveShadow geometry={nodes.shoe.geometry} material={materials.laces}
            material-envMapIntensity={0.8}/>
      <mesh castShadow receiveShadow geometry={nodes.shoe_1.geometry} material={materials.mesh}
            material-envMapIntensity={0.8}/>
      <mesh castShadow receiveShadow geometry={nodes.shoe_2.geometry} material={materials.caps}
            material-envMapIntensity={0.8}/>
      <mesh castShadow receiveShadow geometry={nodes.shoe_3.geometry} material={materials.inner}
            material-envMapIntensity={0.8}/>
      <mesh castShadow receiveShadow geometry={nodes.shoe_4.geometry} material={materials.sole}
            material-envMapIntensity={0.8} />
      <a.mesh castShadow receiveShadow geometry={nodes.shoe_5.geometry} material={materials.stripes}
            material-envMapIntensity={0.8} scale-x={scale} scale-z={scale}/>
      <mesh castShadow receiveShadow geometry={nodes.shoe_6.geometry} material={materials.band}
            material-envMapIntensity={0.8} />
      <mesh castShadow receiveShadow geometry={nodes.shoe_7.geometry} material={materials.patch}
            material-envMapIntensity={0.8} />
    </group>
  )
}


