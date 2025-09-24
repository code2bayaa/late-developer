"use client"
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';

const Home = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const iconsRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    document.title = "Brian Wekesa | Software Engineer";
  }, []);

  useEffect(() => {
    try{
      async function insertVisitor(){
        const response = await fetch('/api/Visitors/insert',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'  
          },
          body: JSON.stringify({
            date: new Date().toISOString().split('T')[0],
            type: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
          })
        })
        let responseData = await response.json();
        console.log(responseData)
      }
      insertVisitor();
    }catch(error){
      console.error("Error logging visitor data:", error)    
    }
  }, []);
    

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current, iconsRef.current], {
      opacity: 0,
      y: 50
    });

    // Animate elements in sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3")
    .to(iconsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.3");

    // Floating animation for the entire hero section
    gsap.to(heroRef.current, {
      y: -10,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    let ctx = gsap.context(() => {
      const t1 = gsap.timeline()
      t1.to(".open-name", {
        width:"100%",
        duration:0.4
      })
      .from(["#quote-one", "#quote-two", "#quote-three", "#quote-four"], {
        stagger: 0.5,
      })
      .to(["#quote-one", "#quote-two", "#quote-three", "#quote-four"], {
        y: "-=30",
        delay: 0.3,
        stagger: 0.5,
      })
    }, sectionRef)
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={sectionRef} className="min-h-screen flex flex-wrap items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-700 to-gray-600">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-subtle"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className='lg:w-[30%] sm:w-[100%] h-[100%] left-0 top-0 flex justify-center items-center'>
        <Image
          src="/avatar.png"
          alt="Avatar"
          width={350}
          height={350}
          className="mx-auto h-[90%] w-[60%] mb-6 rounded-full border-4 border-primary/50 shadow-lg"
          style={{ filter: 'drop-shadow(0 0 0.75rem gray)' }}
        />
      </div>
      <div ref={heroRef} className="lg:w-[70%] sm:w-[100%] relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">        
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Hi, I'm{' '}
          <span className="gradient-text">Brian Wekesa</span> 👋
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl text-[#ffd800] sm:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          A passionate{' '}
          <span className='w-[20%]'>
            <span className="text-primary font-semibold">Software Engineer</span>{' '}
            <span className = "open-name"></span>
          </span>
          
          {/* <span className='"close-name'></span> */}
          crafting innovative solutions with modern web technologies
        </p>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={scrollToProjects}
            size="lg" 
            className="bg-gradient-primary text-[#fff] hover:glow-primary transition-all duration-300 px-8 py-6 text-lg font-medium"
          >
            View My Work
          </Button>
          <Button 
            onClick={scrollToContact}
            variant="outline" 
            size="lg"
            className="border-primary/50 text-[#fff] hover:bg-primary/10 px-8 py-6 text-lg font-medium"
          >
            Get In Touch
          </Button>
        </div>
        <div className='w-[100%] rounded-md h-[auto] bg-white/10 mb-8'>
            <div id = "quote-one">
              <p>Invention is the most important product of man's creative brain.</p>
            </div>
            <div id = "quote-two">
              <p>&nbsp;&nbsp;&nbsp; The ultimate purpose is the complete mastery of mind over the material world,</p>
            </div>
            <div id = "quote-three">
              <p>the harnessing of human nature to human needs.</p>            
            </div>
            <div id = "quote-four" className='text-[#ffd800]'>
              <p>&#x23AF; Nikola Tesla</p>
            </div> 
        </div>

        <div ref={iconsRef} className="flex justify-center space-x-6">
          <a 
            href="https://github.com/code2bayaa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 glass-card rounded-full hover:glow-primary transition-all duration-300 group"
          >
            <Github className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
          <a 
            href="https://www.linkedin.com/in/late-developers" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 glass-card rounded-full hover:glow-primary transition-all duration-300 group"
          >
            <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
          <a 
            href="mailto:bayaavint@gmail.com"
            className="p-3 glass-card rounded-full hover:glow-primary transition-all duration-300 group"
          >
            <Mail className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Home;