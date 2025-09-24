"use client"
import { FoxModel } from "@/models/Fox";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Loader from "./Loader";

const FOX = ({currentAnimation}) => {

    const [windowObject, setWindow] = useState(null)

    useLayoutEffect(() => {
        setWindow(window)
    },[])

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
        <Canvas
            camera={{
                position: [0, 0, 5],
                fov: 75,
                near: 0.1,
                far: 1000,
            }}
            dpr={Math.min(windowObject && windowObject.devicePixelRatio,2)}
        >
            <AdaptiveCanvas/>
            <PerspectiveCamera makeDefault position={[0,0,7]}/>
            <OrbitControls />
            {
                windowObject && windowObject.screen.width > 800 ? <>
                    <directionalLight position={[0, 0, 1]} intensity={2.5} />
                </>
                :
                ""
            }
            <ambientLight intensity={1} />
                <pointLight position={[5, 10, 0]} intensity={2} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={2}
                    />
            <Suspense fallback={<Loader />}>
                <FoxModel
                    currentAnimation={currentAnimation}
                    position={windowObject && windowObject.screen.width > 800 ? [0.5, 0.35, 0] : [0.5, 2.5, -1.5]}
                    rotation={[12.629, -0.6, 0]}
                    scale={[0.5, 0.5, 0.5]}
                />
            </Suspense>
        </Canvas>
    )
}

export default FOX;