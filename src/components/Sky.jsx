"use client"
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useLayoutEffect, useState } from "react";
import { SkyModel } from "@/models/Sky";
import Loader from "./Loader"
import gsap from "gsap";

const Sky = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

    useLayoutEffect(() => {
      gsap.timeline({
        scrollTrigger : {
          trigger: "#about",
          scrub : true,
          markers : false,
          start : 'top 80%',
          scroller : "#build",
          end: "bottom bottom",
          onLeaveBack: function() {
            setIsRotating(false)
          },
          onEnter : () => {
            setIsRotating(true)
          },
      }})
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
          className={`${
            isRotating ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{width:"100%"}}
          dpr={Math.min(window.devicePixelRatio,2)}
          camera={{ near: 0.7, far: 1000 }}
        >
          <AdaptiveCanvas/>
          <PerspectiveCamera makeDefault position={[0,0,7]}/>
          <OrbitControls />
        <Suspense fallback={<Loader />}>
        {
          window.screen.width > 800 ? <>
          <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 5, 10]} intensity={2} />
            <spotLight
              position={[0, 50, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />
          </>
          :
          ""
        }

          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />

          <SkyModel isRotating={isRotating} />
        </Suspense> 
      </Canvas>
    )
}

export default Sky;