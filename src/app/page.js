"use client"
import Navigation from '@/components/Navigation';
import Home from '@/components/Home';
import About from '@/components/About';
import dynamic from "next/dynamic";
const Animations = dynamic(() => import("@/components/Animations"), {
  ssr: false, // disables server-side rendering
});
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
// import INSTITUTIONS from '@/components/Institutions';

const Index = () => {
  return (
      <div id="build" className="min-h-screen bg-background">
        <Navigation />
        <Home />
        <About />
        {/* <INSTITUTIONS /> */}
        <Animations />
        <Projects />
        <Contact />
      </div>

  );
};

export default Index;