"use client"; // if using Next.js app router
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PROJECTS = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [timeRange, setTimeRange] = useState("90d")
    const [chartData, setChartData] = useState(null)


    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            try {
                const response = await fetch('/api/Visitors/fetch');
                const result = await response.json();
                setChartData(result);
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        fetchData();
    }, []);

    if (!chartData) {
        return <div>Loading chart data...</div>; // Show a loading state while fetching data
    }

    const description = "Visitors on my portfolio"

    const filteredData = chartData.data.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date()
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
        },
        mobile: {
            label: "Mobile",
            color: "var(--chart-2)",
        },
    }

    const projects = [
            {
            icon : '/collabowid.png',
            theme: 'btn-back-red',
            name: 'CWID',
            description: 'collabowid.org is a modern, animated website designed to connect and empower NGOs, communities, and individuals working towards social impact. The platform serves as a hub for collaboration, providing a space where organizations can share resources, launch initiatives, and coordinate campaigns that address pressing global and local challenges.',
            link: 'https://collabowid.org',
        },
        {
            icon : '/weforshe1.png',
            theme: 'btn-back-red',
            name: '#WEFORSHE',
            description: 'We for She is a dynamic and interactive website built for an NGO dedicated to advocating for women’s rights and creating awareness on issues such as gender-based violence (GBV), teenage pregnancies, and digital literacy. The site serves as both an informational hub and an engagement platform, combining storytelling, campaigns, and modern web animations to capture attention and inspire action.',
            link: 'https://weforshe.org',
        },
        {
            icon : '/uko.png',
            theme: 'btn-back-red',
            name: 'UKO',
            description: 'UKOapp is a full-stack movie streaming application that allows users to discover, stream, and interact with movies in real time. It’s built with a focus on smooth playback, scalability, and a modern user experience. Movie Streaming – On-demand playback of movies with support for torrent streaming and live conversion (MKV/MOV → MP4/HLS).',
            link: 'https://uko-app.co.ke',
        },
        {
            icon : '/mental.webp',
            theme: 'btn-back-green',
            name: 'Mental Health',
            description: 'The Mental Health Mobile App is a modern, patient-centered platform designed to connect individuals struggling with mental health challenges to qualified doctors, therapists, and counselors. The app emphasizes privacy, accessibility, and real-time support, creating a safe digital space for users to seek help, track progress, and stay connected with professionals. Secure video calls, voice calls, and in-app chat for therapy sessions and consultations.',
            link: 'https://github.com/code2bayaa/mental-health',
        },
        {
            icon : '/tum.png',
            theme: 'btn-back-yellow',
            name: 'Student Registration',
            description: 'I developed a modern web-based Student Registration Platform for TUM University, designed to simplify enrollment, course management, and student record handling. The platform is built with Laravel and Microsoft SQL Server, providing a secure, scalable, and efficient system for both students and administrators.',
            link: 'https://github.com/code2bayaa/student-registration',
        }
    ];

    return (
        <div id="projects" className="bg-gradient-to-br from-gray-900 via-gray-700 to-gray-600 w-[100%] min-h-[160%] text-[#000] flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="w-[100%] text-[#fff] text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                    <span className="gradient-text">Pro</span>jects
                </h2>
                <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                    Here are some of the projects I have worked on recently. Each project showcases my skills in web development, design, and problem-solving. Feel free to explore them and reach out if you have any questions or would like to collaborate!
                </p>
            </div>            
            
            {/* Main Preview Slider */}
            <div className="w-[80%] h-[300px] mb-10">
                <Swiper
                    modules={[Thumbs]}
                    thumbs={{ swiper: thumbsSwiper }}
                    spaceBetween={10}
                    className="mb-4 rounded-2xl h-[300px] overflow-hidden"
                >
                    {projects.map(({icon,description,name,link}, i) => (
                        <SwiperSlide key={i} className=" h-[300px] lg:w-[60%] sm:w-[100%] md:w-[100%]">
                            <div className="w-[100%] h-[300px] flex flex-wrap">
                                <img src={icon} alt={`slide ${i}`} className="lg:w-[60%] sm:w-[100%] md:w-[100%] h-[100%] object-cover" />
                                <div className="lg:w-[40%] bg-zinc-900 text-[#fff] sm:w-[100%] px-4 py-4 md:w-[100%]">
                                    <h1>{name}</h1>
                                    <article>{description}</article>
                                    <p>{link}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="w-[100%] h-[30%]">
                {/* Thumbnail Slider */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[FreeMode, Thumbs]}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className="cursor-pointer"
                >
                    {projects.map(({icon,name}, i) => (
                        <>
                            <SwiperSlide key={i}>
                                <img
                                src={icon}
                                alt={`thumb ${i}`}
                                className="w-[100%] h-[150px] object-cover rounded-xl"
                                />
                            </SwiperSlide>
                            <h2>{name}</h2>
                        </>

                    ))}
                </Swiper>
            </div>
            {/* Visitors in website*/}
            <div className="w-[100%] h-[60%] mt-20 text-[#fff]">
                <Card className="pt-0">
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1">
                        <CardTitle>{description}</CardTitle>
                        <CardDescription>
                            Showing total visitors for the last 3 months
                        </CardDescription>
                        </div>
                        <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                            </SelectItem>
                        </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                        <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                        >
                        <AreaChart data={filteredData}>
                            <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                offset="5%"
                                stopColor="rgba(224 71.4% 4.1%)"
                                stopOpacity={0.8}
                                />
                                <stop
                                offset="95%"
                                stopColor="rgba(224 71.4% 4.1%)"
                                stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                offset="5%"
                                stopColor="rgba(336.2 83.9% 17.1%)"
                                stopOpacity={0.8}
                                />
                                <stop
                                offset="95%"
                                stopColor="rgba(336.2 83.9% 17.1%)"
                                stopOpacity={0.1}
                                />
                            </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                })
                            }}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                labelFormatter={(value) => {
                                    return new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    })
                                }}
                                indicator="dot"
                                />
                            }
                            />
                            <Area
                            dataKey="mobile"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="var(--color-mobile)"
                            stackId="a"
                            />
                            <Area
                            dataKey="desktop"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke="var(--color-desktop)"
                            stackId="a"
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default PROJECTS;