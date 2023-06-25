import React from "react";
import { Canvas } from "@react-three/fiber";
import Cubes from "./Cubes";
import Lights from "./Lights";
import Environment from "./Environment";

const RotateBox = () => {
  return (
    <Canvas
      shadows  // gl.shadowMap
    >
      <Cubes />
      <Lights />
      <Environment />
    </Canvas>
  );
}

export default RotateBox
