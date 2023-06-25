import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {OrbitControls, useGLTF, useTexture} from '@react-three/drei'
import React, {Suspense, useEffect, useLayoutEffect, useState} from 'react'
import * as THREE from 'three'
import style from './index.module.less'
import RoomEnvironment from './Environment'

function Model(props) {
  const {scene} = useThree()
  const [grid, setGrid] = useState(null)
  const {bodyColor, detailsColor, glassColor, ...resetProps} = props
  const {scene: modelScene} = useGLTF('/assets/models/gltf/ferrari.glb')
  const carModel = modelScene.children[0]


  useEffect(() => {
    const baseGridHelper = scene.getObjectByName('baseGridHelper')
    if (!baseGridHelper) {
      let gridHelper = new THREE.GridHelper(100, 40, 0x000000, 0x000000)
      gridHelper.name = 'baseGridHelper'
      gridHelper.material.opacity = 0.05
      gridHelper.material.depthWrite = false
      gridHelper.material.transparent = true
      setGrid(gridHelper)
      scene.add(gridHelper)
    }
  }, [scene])

  useLayoutEffect(() => {
    if (bodyColor) {
      carModel.getObjectByName('body').material = new THREE.MeshPhysicalMaterial({
        color: bodyColor, metalness: 0.6, roughness: 0.4, clearcoat: 0.05, clearcoatRoughness: 0.05
      })
    }
  }, [carModel, bodyColor])

  useLayoutEffect(() => {
    if (detailsColor) {
      const detailsMaterial = new THREE.MeshStandardMaterial({
        color: detailsColor, metalness: 1.0, roughness: 0.5
      })
      carModel.getObjectByName('rim_fl').material = detailsMaterial
      carModel.getObjectByName('rim_fr').material = detailsMaterial
      carModel.getObjectByName('rim_rr').material = detailsMaterial
      carModel.getObjectByName('rim_rl').material = detailsMaterial
      carModel.getObjectByName('trim').material = detailsMaterial
    }
  }, [carModel, detailsColor])

  useLayoutEffect(() => {
    if (glassColor) {
      carModel.getObjectByName('glass').material = new THREE.MeshPhysicalMaterial({
        color: glassColor, metalness: 0, roughness: 0.1, transmission: 0.9, transparent: true
      })
    }
  }, [carModel, glassColor])

  useFrame(({ clock }) => {
    const fl = carModel.getObjectByName('wheel_fl')
    const fr = carModel.getObjectByName('wheel_fr')
    const rl = carModel.getObjectByName('wheel_rl')
    const rr = carModel.getObjectByName('wheel_rr')

    if(fl && fr && rl && rr && grid){
      fl.rotation.x = -clock.elapsedTime * Math.PI;
      fr.rotation.x = -clock.elapsedTime * Math.PI;
      rl.rotation.x = -clock.elapsedTime * Math.PI;
      rr.rotation.x = -clock.elapsedTime * Math.PI;
      grid.position.z = ( clock.elapsedTime ) % 5;
    }
  })

  return (
    <primitive object={carModel} {...resetProps} >
      <CarShadow />
    </primitive>
  )
}

function CarShadow(props) {
  const texture = useTexture('/assets/models/gltf/ferrari_ao.png')
  return (
    <mesh {...props} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
      <planeGeometry args={[0.655 * 4, 1.3 * 4]} />
      <meshBasicMaterial
        map={texture}
        blending={THREE.MultiplyBlending}
        toneMapped={false}
        transparent={true}
      />
    </mesh>
  )
}

export default function Car2() {
  const [bodyColor, setBodyColor] = useState('#ff0000')
  const [detailsColor, setDetailsColor] = useState('#ffffff')
  const [glassColor, setGlassColor] = useState('#ffffff')

  const changeBodyColor = (e) => {
    setBodyColor(e.target.value)
  }

  const changeDetailsColor = (e) => {
    setDetailsColor(e.target.value)
  }

  const changeGlassColor = (e) => {
    setGlassColor(e.target.value)
  }

  return (
    <div className={style.container}>
      <div className={style.info}>
        <span className="colorPicker"><input type="color" value={bodyColor} onChange={changeBodyColor} /> Body</span>
        <span className="colorPicker"><input type="color" value={detailsColor} onChange={changeDetailsColor} /> Details</span>
        <span className="colorPicker"><input type="color" value={glassColor} onChange={changeGlassColor} /> Glass</span>
      </div>
      <Canvas legacy shadows camera={{fov: 40, position: [4.25, 1.4, -4.5]}}>
        <color attach="background" args={[0xeeeeee]} />
        <fog attach="fog" args={[0xeeeeee, 10, 50]} />
        <RoomEnvironment />

        <Suspense fallback={null}>
          <Model bodyColor={bodyColor} detailsColor={detailsColor} glassColor={glassColor} />
        </Suspense>

        <OrbitControls target={[0, 0.5, 0]} />
      </Canvas>
    </div>
  )
}

