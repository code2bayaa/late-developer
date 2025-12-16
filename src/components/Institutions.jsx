'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Globe, Smartphone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const INSTITUTIONS = () => {

    const sectionInstitutionRef = useRef(null);
    const containerRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, []);
    useEffect(() => {
    if (!sectionInstitutionRef.current || !containerRef.current) return;

    const section = sectionInstitutionRef.current;
    const container = containerRef.current;

    const onRefreshInit = () => gsap.set(container, { x: 0 });

    const init = () => {
      // cleanup any existing triggers
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.set(container, { x: 0 });

      // visible area width should be the section width (not full window when layout is constrained)
      const visibleWidth = section.clientWidth;
      const totalWidth = container.scrollWidth;
      const scrollAmount = totalWidth - visibleWidth;

      // enable GSAP horizontal scroll only on wide screens when there's overflow
      if (window.innerWidth > 800 && scrollAmount > 20) {
        gsap.to(container, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `=${scrollAmount}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scroller:"#build",
            // use body (default) so it works reliably across layouts
            // remove scroller option unless you have a custom scroller element
            markers: false,
          },
        });
      } else {
        // reset for small screens or when no overflow
        gsap.set(container, { x: 0, clearProps: "transform" });
        ScrollTrigger.refresh();
      }
    };

    // init once and on resize / refresh
    init();
    window.addEventListener("resize", init);
    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

    // cleanup
    return () => {
      window.removeEventListener("resize", init);
      ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.set(container, { x: 0 });
    };
  },[])

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
        <div
            id="institutions"
            className="w-[100%] h-[auto] py-20 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 relative"
        
        >
        <section
            ref={sectionInstitutionRef}         
            className="relative w-screen h-screen overflow-hidden"
        >
        <div className="w-full text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Institutions
            </h2>
        </div>

        <div
            ref={containerRef}
            className="flex h-full w-max" // <- important: horizontal flow
        >
            {institutions.map(({ title, company_name, points, icon }, idx) => (
            <div
                key={idx}
                className={`min-w-[80vw] sm:min-w-[50vw] ${windowWidth > 800 ? "h-[80vh]" : "h-full"} m-[1%] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex flex-col items-center justify-center p-10 rounded-xl`}
            >
                <Image
                src={icon}
                alt={title}
                width={200}
                height={200}
                className="w-[200px] h-[200px] object-cover rounded-xl shadow-lg"
                />
                <h2 className="text-2xl font-bold mt-4">{company_name}</h2>
                <p className="text-[#000] mt-2 text-center max-w-md">{title}</p>
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
    )
}

export default INSTITUTIONS