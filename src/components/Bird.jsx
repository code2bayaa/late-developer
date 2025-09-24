"use client"
import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { BirdModel } from "@/models/Bird";
import { Suspense, useLayoutEffect } from "react";
import Loader from "./Loader";


const Bird = () => {

  function AdaptiveCanvas(){
    const {camera } = useThree();

    useLayoutEffect(() => {

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix();
      }
  
      window.addEventListener('resize',handleResize)

      return () => window.addEventListener('resize',handleResize);
    },[camera])
  }
  
  return (
    <div id = "Bird" className="w-[80%] h-[80%] absolute top-0 left-0 right-0 bottom-0 m-auto">
      <Canvas
        camera={{ position: [2, 2, 7], fov: 55, near: 0.1, far: 1000 }}
        dpr={Math.min(window.devicePixelRatio,2)}
      >
        <AdaptiveCanvas/>
        <PerspectiveCamera makeDefault position={[0,0,7]}/>
        <OrbitControls />
        <directionalLight position={[0, 0, 1]} intensity={0.5} />
        <ambientLight intensity={1} />
        <pointLight position={[1, 10, 0]} intensity={2} />
        <spotLight
          position={[5, 10, 10]}
          angle={0.11}
          penumbra={1}
          intensity={3}
        />
        <directionalLight intensity={0.7} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={<Loader/>}>
          <BirdModel />
        </Suspense>
      </Canvas>
    </div>
  )
};

export default Bird;
