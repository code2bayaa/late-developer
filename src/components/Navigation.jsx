"use client"
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    if(window.screen.width > 800){
      if(containerRef.current){
        containerRef.current.querySelectorAll('button').forEach((btn) => {
          gsap.to(btn,{
            ease : "none",
            color:"#000",
            textShadow:"0 0 5px #fff",
            scrollTrigger : {
                trigger : `#about`,
                scroller:"#build",
                scrub : true,
                markers : false,
                start : 'top top',
                end : "bottom bottom"
            }
          })
          gsap.to(btn,{
            ease : "none",
            color:"#fff",
            textShadow:"0 0 5px #000",
            scrollTrigger : {
                trigger : `#projects`,
                scroller:"#build",
                scrub : true,
                markers : false,
                start : 'top top',
                end : "bottom bottom"
            }
          })
          gsap.to(btn,{
            ease : "none",
            color:"#000",
            textShadow:"0 0 5px #fff",
            scrollTrigger : {
                trigger : `#contact`,
                scroller:"#build",
                scrub : true,
                markers : false,
                start : 'top top',
                end : "bottom bottom"
            }
          })
        })
      }

    }

  },[])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "glass-card backdrop-blur-xl border-b border-white/10" 
        : "bg-transparent"
    )}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="gradient-text text-xl font-bold">
            Brian Wekesa
          </div>

          {/* Desktop Navigation */}
          <div ref={containerRef} className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                id="mobile-nav-item"
                onClick={() => scrollToSection(item.href)}
                className="text-[#fff] cursor-pointer hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Navigation Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden glass-card mt-2 p-4 rounded-lg">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  id="mobile-nav-item"
                  className="text-left cursor-pointer text-[#fff] hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;