"use client"
import Sky from "./Sky";
import Bird from "./Bird";
import { useEffect, useState } from "react";


const Animations = () => {

    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        // Set initial window width
        setWindowWidth(window.screen.width);

    }, []);

    return (
        <>
            {
                windowWidth && windowWidth > 800 ? (
                    <div className="w-full h-[100%] relative">
                        <Sky/>
                        <Bird className="absolute z-50 top-[-1%]"/>
                    </div>
                ) : (
                    <p>Animations on a larger screen</p>
                )
            }
        </>

    )

}

export default Animations;