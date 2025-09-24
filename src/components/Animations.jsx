"use client"
import Sky from "./Sky";
import Bird from "./Bird";


const Animations = () => {

    return (
        <div className="w-full h-[100%] relative">
            <Sky/>
            <Bird className="absolute z-50 top-[-1%]"/>
        </div>
    )
}

export default Animations;