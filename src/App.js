
import React, { useState, useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Canvas, extend, useThree, useFrame } from "react-three-fiber"
import { useSpring, a } from "react-spring/three"
import {  Stars } from "drei";

import "./style.css"

extend({ OrbitControls })

const Logo = () => {
  const [model, setModel] = useState()

  useEffect(() => {
    new GLTFLoader().load("https://res.cloudinary.com/djuqxjkh3/image/upload/v1614194557/mylogo3d/jona_u6as49.glb", setModel)
  })
console.log('dfdf',model);
  return model ? <primitive object={model.scene} /> : null
}

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      autoRotate
     
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}




export  const App = () => {
  const isBrowser = typeof window !== "undefined"

  return (
    <>
     
      {isBrowser && (
        <Canvas
          camera={{ position: [1,1,0] }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true
            gl.shadowMap.type = THREE.PCFSoftShadowMap
          }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} penumbra={1} castShadow />
          <fog attach="fog" args={["black", 10, 25]} />
          <Controls />
         <Stars/>
          <Logo />
        </Canvas>
      )}
    </>
  )
}
