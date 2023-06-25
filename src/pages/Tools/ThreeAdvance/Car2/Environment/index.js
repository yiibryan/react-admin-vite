import React, {useMemo} from 'react'
import {BackSide, BufferGeometry} from 'three'

function Room(props) {
  const {geometry, ...resetProps} = props
  return (
    <mesh>
      <primitive attach="geometry" object={geometry} />
      <meshStandardMaterial side={BackSide} {...resetProps} />
    </mesh>
  )
}

function Box(props) {
  const {geometry, ...resetProps} = props;
  return (
    <mesh>
      <primitive attach="geometry" object={geometry} />
      <meshStandardMaterial
        {...resetProps}
      />
    </mesh>
  )
}

function Light(props){
  const {geometry, ...resetProps} = props;
  return (
    <mesh>
      <primitive attach="geometry" object={geometry} />
      <meshBasicMaterial
        {...resetProps}
      />
    </mesh>
  )
}

const Environment = () => {
  const globalGeometry = useMemo(() => new BufferGeometry(), [])
  globalGeometry.deleteAttribute( 'uv' );

  return (
    <>
      {/*mainLight*/}
      <pointLight position={[0.418, 16.199, 0.300]} color={0xffffff} intensity={5} distance={28} decay={2.0}/>

      {/*room*/}
      <Room
        geometry={globalGeometry}
        position={[-0.757, 13.219, 0.717]}
        scale={[31.713, 28.305, 28.591]}
      />

      {/*box1*/}
      <Box
        geometry={globalGeometry}
        position={[-10.906, 2.009, 1.846]}
        rotation={[0, -0.195, 0]}
        scale={[2.328, 7.905, 4.651]}
      />

      {/*box2*/}
      <Box
        geometry={globalGeometry}
        position={[-5.607, -0.754, -0.758]}
        rotation={[0, 0.994, 0]}
        scale={[1.970, 1.534, 3.955]}
      />

      {/*box3*/}
      <Box
        geometry={globalGeometry}
        position={[6.167, 0.857, 7.803]}
        rotation={[0, 0.561, 0]}
        scale={[3.927, 6.285, 3.687]}
      />

      {/*box4*/}
      <Box
        geometry={globalGeometry}
        position={[-2.017, 0.018, 6.124]}
        rotation={[0, 0.333, 0]}
        scale={[2.002, 4.566, 2.064]}
      />

      {/*box5*/}
      <Box
        geometry={globalGeometry}
        position={[2.291, -0.756, -2.621]}
        rotation={[0, -0.286, 0]}
        scale={[1.546, 1.552, 1.496]}
      />

      {/*box6*/}
      <Box
        geometry={globalGeometry}
        position={[-2.193, -0.369, -5.547]}
        rotation={[0, 0.516, 0]}
        scale={[3.875, 3.487, 2.986]}
      />

      {/*-x right*/}
      <Light
        geometry={globalGeometry}
        color={50}
        position={[-16.116, 14.37, 8.208]}
        scale={[0.1, 2.428, 2.739]}
      />

      {/*-x left*/}
      <Light
        geometry={globalGeometry}
        color={50}
        position={[-16.109, 18.021, -8.207]}
        scale={[0.1, 2.425, 2.751]}
      />

      {/* +x */}
      <Light
        geometry={globalGeometry}
        color={17}
        position={[14.904, 12.198, -1.832]}
        scale={[0.15, 4.265, 6.331]}
      />

      {/* +z */}
      <Light
        geometry={globalGeometry}
        color={43}
        position={[-0.462, 8.89, 14.520]}
        scale={[4.38, 5.441, 0.088]}
      />

      {/* -z */}
      <Light
        geometry={globalGeometry}
        color={20}
        position={[3.235, 11.486, -12.541]}
        scale={[2.5, 2.0, 0.1]}
      />

      {/* +y */}
      <Light
        geometry={globalGeometry}
        color={100}
        position={[0.0, 20.0, 0.0]}
        scale={[1.0, 0.1, 1.0]}
      />
    </>
  )
}

export default Environment
