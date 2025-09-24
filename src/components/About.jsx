'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Globe, Smartphone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const skillsRef = useRef(null);
  const sectionInstitutionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionInstitutionRef.current;
    const container = containerRef.current;
    const totalWidth = container.scrollWidth; // total scroll width
    const windowWidth = window.innerWidth;

    gsap.to(container, {
      x: -(totalWidth - windowWidth), // scroll full width
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth - windowWidth}`, // scroll length
        scrub: true,
        pin: true,
        anticipatePin: 1,
        scroller: "#build",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = cardsRef.current?.children;
    const skills = skillsRef.current?.children;

    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scroller: "#build",
            // markers: true,
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (skills) {
      gsap.fromTo(skills,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            scroller: "#build",
          }
        }
      );
    }
  }, []);

  const expertiseAreas = [
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks."
    },
    {
      icon: <Database className="w-8 h-8 text-primary" />,
      title: "Backend Development",
      description: "Developing robust server-side applications with Node.js, Express, and various databases."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Full-Stack Solutions",
      description: "Creating end-to-end applications that seamlessly connect frontend and backend systems."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      title: "Mobile Development",
      description: "Building cross-platform mobile applications with React Native and modern mobile technologies."
    }
  ];

const skills = [
    {
        imageUrl: '/hacking.png',
        name: "Hacking",
        type: "DevOps",
    },
    {
        imageUrl: '/linux.png',
        name: "LINUX",
        type: "DevOps",
    },
    {
        imageUrl: '/aws.webp',
        name: "AWS CLOUD",
        type: "BackEnd",
    },
    {
        imageUrl: '/google.png',
        name: "GOOGLE CLOUD",
        type: "BackEnd",
    },
    {
        imageUrl: '/css.svg',
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: '/express.svg',
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: '/python.png',
        name: "Python",
        type: "Backend",
    },
    {
        imageUrl: '/git.svg',
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: '/github.svg',
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: '/html.svg',
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: '/javascript.svg',
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: '/mongodb.svg',
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: '/motion.svg',
        name: "Motion",
        type: "Animation",
    },
    {
        imageUrl: '/mui.svg',
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: '/nextjs.svg',
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: '/nodejs.svg',
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: '/react.svg',
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: '/redux.svg',
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: '/sass.svg',
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: '/tailwindcss.svg',
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: '/typescript.svg',
        name: "TypeScript",
        type: "Frontend",
    }
];
//   const skills = [
//     "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
//     "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Docker", "AWS",
//     "Git", "Tailwind CSS", "GSAP", "Three.js", "Express.js", "FastAPI"
//   ];
  const institutions = [
      {
          title: "ICT TUTOR",
          company_name: "ANCILLA VOCATIONAL TRAINING COLLEGE",
          icon: '/ancilla.png',
          iconBg: "#accbe1",
          date: "July 2024 - March 2025",
          points: [
              "I lecture at this institution, covering computer science fundamentals and beginner-level Computer Programming Tutorials (CPT).",
              "I provide programming guidance and tutoring in Java and Python for students at different levels of expertise.",
              "The program welcomes learners of all ages, ensuring no restrictions on student registration.",
              "I designed both verbal and non-verbal teaching methods to effectively guide, inform, and engage learners.",
              "I also help organize educational events, coding workshops, and training schedules that align with community and institutional standards.",
          ],

      },
      {
          title: "Web Developer",
          company_name: "CWID",
          icon: '/footer3.jpeg',
          iconBg: "#accbe1",
          date: "January 2024 - July 2024",
          points: [
              "CWID is the collaboration of women in development PBO based in Mombasa Kenya",
              "It is a community based organization which helps women based problems and agendas",
              "I was at an ICT capacity and organized for there website deployment and other dynamic applications like local intranet configuration, with telephony, email and chat features",
              "A partnership was formed and helped in my development of late developers.",
          ],
      },
      {
          title: "Start Up Founder",
          company_name: "late developers",
          icon: '/ldBlack.png',
          iconBg: "#accbe1",
          date: "June 2023 - ",
          points: [
              "Introduction of a start up that combats digital illiteracy, by promoting digital standards as an easy way of living",
              "Deployed products which entail web design, mobile applications, ICT tutoring, hardware maintenance and ISP configurations with detail to diaspora locations.",
              "We work remotely and also on premise at Mombasa. Closely with community based organisations",
              "Changing how the vast majority thinks, one code at a time.",
          ],
      },
      {
          title: "Front End Developer",
          company_name: "TURING",
          icon: '/turing_.jpg',
          iconBg: "#accbe1",
          date: "October 2022 -",
          points: [
              "Developing and maintaining web applications using React.js and other related technologies.",
              "Collaborating with remote-functional teams including designers, product managers, and other developers to create high-quality products.",
              "Implementing responsive design and ensuring remote-browser compatibility.",
              "Participating in code reviews and providing constructive feedback to other developers.",
          ],
      },
      {
          title: "WEB DEVELOPER",
          company_name: "TUM UNIVERSITY",
          icon: '/tum_.jpeg',
          iconBg: "#fbc3bc",
          date: "Feb 2022 - Sep 2022",
          points: [
              "Developing and maintaining web applications using Javascript and other related technologies.",
              "Team building meetings and collaborative strategies to implement code and fix bugs.",
              "Database schema update and installation. Among which were MsSql and MySql.",
              "Participating in code reviews and providing constructive feedback by a staff committee.",
          ],
      },
      {
          title: "ICT SUPERVISER",
          company_name: "IEBC MVITA",
          icon: '/iebc_.png',
          iconBg: "#b7e4c7",
          date: "Oct 2021 - Jan 2022",
          points: [
              "Fixing, updating network routes at headquarters to maintain steady and fast communication.",
              "Satellite installation to achieve local network for gadget use.",
              "Software installation, updating and maintaing for vast user engagement",
              "Participating in data entry among ict help desk",
          ],
      },
      {
          title: "ICT HELP DESK",
          company_name: "KENGEN KIPEVU",
          icon: '/kengen_.jpg',
          iconBg: "#a2d2ff",
          date: "Sep 2016 - Jan 2017",
          points: [
              "Use of ERP and SAP software systems",
              "Collaborating with cross-functional teams. to repair hardware and computer maintenance",
              "Remote fixing client computers to aid with installations and email updates.",
              "Participating in team building and strategical handling of work",
          ],
      },
      {
          title: "University",
          company_name: "MOI UNIVERSITY",
          icon: '/moi_.jpg',
          iconBg: "#a2d2ff",
          date: "Sep 2014 - Dec 2019",
          points: [
              "University graduate",
              "Studied in the field of Computer Science",
              "Graduated with Second Class"
          ],
      },
      {
          title: "High School",
          company_name: "CHAVAKALI",
          icon: '/chavakali_.jpg',
          iconBg: "#a2d2ff",
          date: "Jan 2010 - Dec 2013",
          points: [
              "High School education",
              "Graduated with A"
          ],
      },
  ];
  return (
    <section ref={sectionRef} id="about" className="w-[100%] h-[auto] py-20 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 relative">
      <div className="w-[100%] h-[auto] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-[100%] text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate software engineer with 5+ years of experience building 
            scalable web applications and innovative digital solutions. I love turning 
            complex problems into simple, beautiful, and intuitive solutions.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {expertiseAreas.map((area, index) => (
            <Card key={index} className="glass-card hover:glow-primary transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    {area.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {area.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center w-[100%]">
          <h3 className="text-2xl font-semibold mb-8 gradient-text">
            Technologies & Tools
          </h3>
          <div ref={skillsRef} className="flex sm:w-[100%] flex-wrap justify-center gap-3">
            {skills.map(({name,type,imageUrl}, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="flex flex-wrap sm:min-h-[150px] md:min-h-[150px] lg:w-[25%] md:w-[30%] sm:w-[98%] px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:glow-primary transition-all duration-300"
              >
                <Image src={imageUrl} alt={name} width={100} height={100} className="w[10%] inline-block mr-2 mb-1" />
                {name} | {type}
              </Badge>
            ))}
          </div>
        </div>
        <section ref={sectionInstitutionRef} className="relative w-screen h-screen overflow-hidden">
          <div
            ref={containerRef}
            className="flex w-[100%]"
          >
            {institutions.map(({title, company_name, points, icon, date}, idx) => (
              <div
                key={idx}
                className="md:w-[45%] sm:w-[98%] lg:min-w-[30%] m-[1%] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] h-full flex flex-col items-center justify-center p-10"
              >
                {/* <img src={icon} alt={title} className="w-[60%] h-[20%] object-contain rounded-xl shadow-lg" /> */}
                <Image src={icon} alt={title} width={200} height={200} className="w-[200px] h-[200px] object-cover rounded-xl shadow-lg" />
                <h2 className="text-2xl font-bold mt-4">{company_name}</h2>
                <p className="text-[#000] mt-2 text-center max-w-md">{title}</p>
                <p className="text-[#000] mt-2 text-center max-w-md">{date}</p>
                <ul className="list-disc list-inside mt-4 max-w-md text-[#000]">
                  {points.map((point, index) => (
                    <li key={index} className="mb-2">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>
    </section>
  );
};

export default About;