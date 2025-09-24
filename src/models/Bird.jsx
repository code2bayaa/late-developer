import { useEffect, useLayoutEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import birdScene from "../assets/3D/bird.glb";

// 3D Model from: https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042
export function BirdModel() {
  const birdRef = useRef();

  // Load the 3D model and animations from the provided GLTF file
  const { scene, animations } = useGLTF(birdScene);

  // Get access to the animations for the bird
  const { actions } = useAnimations(animations, birdRef);

  // Play the "Take 001" animation when the component mounts
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.
  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);
  gsap.registerPlugin(ScrollTrigger);

  const startBird = () => {
    console.log("end bird")
    birdRef.current.rotation.y = 0
    
  }
  const changeBird = () => {
    console.log("start bird")
    
    birdRef.current.rotation.y = Math.PI;
  }
  useLayoutEffect(() => {

    //   gsap.to("#Bird",{
    //     ease : "none",
    //     opacity:0,
    //     scrollTrigger : {
    //         trigger : `#about`,
    //         scrub : true,
    //         markers : false,
    //         scroller:"#build",
    //         start : 'bottom 40%',
    //         // end : "bottom bottom"
    //     }
    // })
    

    function createBirdTimeline(id){
      return gsap.timeline({
        scrollTrigger : {
          trigger: id,
          start: "bottom 40%",
          toggleActions : "play none none reverse",
          endTrigger: "#projects",
          end:"#projects",
          markers:false,
          // scrub : true,
          onEnd: function() {
            console.log("end...")
            // endProjects();
          },
          onLeave : () => {
            console.log("leave...")
            // endProjects();
          },
          scroller:"#build"
        }
      })
      .to("#Bird",{
        opacity:1,
        x:"30%",
        duration:4,
        ease:"smooth",
        onStart:startBird
      })
      .to("#Bird",{
        x:"-30%",
        duration:4,
        // opacity:0,
        ease:"smooth",
        onStart:changeBird,
        onComplete:() => {

        }
      })
    }
    
    let timeline = createBirdTimeline("#about");
    // let timelineTwo = createBirdTimeline("#contact");
    

    function endProjects() {
      timeline.kill(); // End the timeline
      // timelineTwo.kill()
   }

  //  gsap.timeline({
  //   scrollTrigger : {
  //     trigger: "#projects",
  //     scrub : true,
  //     markers : false,
  //     start : 'top 70%',
  //     // end : "top bottom",
  //     // scroller : "#root",
  //     // toggleActions:"restart play, pause play",
  //     // endTrigger: "#contacts",
  //     end: "#contact",
  //     // onEnter: () => {
  //     //   endProjects()
  //     //   birdRef.current.rotation.z = 0
  //     //   // document.querySelector("#Bird").target.rotation.z = 0
  //     // },
  //     onLeave:() => {
  //       // timeline = createBirdTimeline("#contact");
  //       timeline.reverse()
  //       timelineTwo.reverse()
  //     },
  //         onLeaveBack: () => {
  //             // Reverse the timeline when leaving divB
  //             timeline.reverse()
  //             timelineTwo.reverse()
  //         }
  //   }})
  //   .to("#Bird",{
  //     opacity:1,
  //     x:"30%",
  //     duration:3,
  //     ease:"smooth",
  //     onStart:() => {
  //       birdRef.current.rotation.z = 0
  //     }
  //   })

},[])

  return (
    // to create and display 3D objects
    <mesh 
      ref={birdRef} 
      // geometry={nodes.Body_Mic_0.geometry}
      // material={materials.material}
      position={[0, 1, 0]} scale={[0.01, 0.005, 0.01]}>
      <primitive object={scene} />
      
    </mesh>
  );
}
