"use client"
import { useState, createContext, useContext } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {Button} from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade"
import IndiaGradient  from "@/components/ui/IndiaGradient"
import  GradientText  from "@/components/ui/GradientText"
import ShinyText from "@/components/ui/Shiny";
import InfiniteScrollingLogosAnimationReverse from "./components/revscroll";
import { Bot, MessageCircle, Activity } from "lucide-react"
// Icons
import { Heart, Shield, Clock, Star, Globe, ChevronDown, Menu, X } from "lucide-react"
import InfiniteScrollingLogosAnimation from "./components/scrolling";
import { RevealLinks } from "@/components/ui/links";
import Bubble from "@/components/ui/bubbletext";
import BubbleText from "@/components/ui/bubbletext";
import FloatingPhone from "@/components/ui/phone";
import InfiniteMenu from "@/components/ui/infinitemenu";
import Threads from "@/components/ui/wave";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import ScrollVelocity from "@/components/ui/scrolll";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import WorldMap from "@/components/ui/world-map";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { TestimonialCard, Testimonials } from "@/components/ui/testimonial";


// Create language context
const LanguageContext = createContext()

// Language provider component
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

// Custom hook to use language
const useLanguage = () => useContext(LanguageContext)

// Translations
const translations = {
  en: {
    nav: {
      home: "Home",
      pricing: "Pricing",
      features: "Features",
      demo: "Demo",
      contact: "Contact",

    },
    hero: {
      title: "Flourish with,",
      titleGradient: "Smarter Decisions",
      callUs: "Call Us: +1(920)-375-7113",
      description:
        "Business questions don’t sleep — neither do we. Insights, anytime.",
      getStarted: "Get Started",
    },
    features: {
      title: "Features",
      heading: "How BlueBox AI Helps You",
      description: "Our AI-powered platform provides comprehensive business intelligence support with these key features",
      personalizedCare: {
        title: "Business Intelligence",
        description: "Get business insights tailored to your specific needs and history.",
      },
      availability: {
        title: "24/7 Availability",
        description: "Access business insights anytime, day or night, without waiting for appointments.",
      },
      secure: {
        title: "Secure & Private",
        description: "Your business data is protected with enterprise-grade security.",
      },
    },
    video: {
      title: "Watch & Learn",
      heading: "See BlueBox AI in Action",
      description: "Watch how our AI business intelligence assistant can transform your business insights experience",
      demo: "BlueBox AI Demo",
      seeHow: "See how our AI assistant works",
      tryIt: "Try It Yourself",
    },
    testimonials: {
      title: "Testimonials",
      heading: "What Our Users Say",
      description: "Hear from people who have transformed their business insights experience with BlueBox AI",
    },
    cta: {
      heading: "Ready to transform your business insights experience?",
      description: "Join thousands of users who have made BlueBox AI their trusted business insights companion.",
      getStarted: "Get Started",
      contactUs: "Contact Us",
    },
    footer: {
      description:
        "AI-powered business insights assistant available 24/7 to address your business concerns and provide guidance with personalized insights.",
      rights: "All rights reserved.",
      quickLinks: "Quick Links",
      contact: "Contact",
      designedWith: "Designed with ❤️ by DataWizards",
    },
    languageSelector: "Language",
  },
  
}



// Language selector component
const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English" },
  ]

  return (
    <div className="relative">
      <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(!isOpen)}>
        <Globe size={16} />
        <span>{languages.find((l) => l.code === language)?.name}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


// Header Component
const Header = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-50 to-blue-50 backdrop-blur-md ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 text-3xl">
            <img src="/f2881fdf-d2ac-41a3-8c0a-7e9c30219a74.png" alt="ArogyaMitra Logo" className="h-10 w-10" />
            <GradientText>BlueBox AI</GradientText>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                {t.nav.home}
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-500 transition-colors">
                {t.nav.pricing}
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">
                {t.nav.features}
              </Link>
              <Link href="#video-section" className="text-gray-600 hover:text-blue-500 transition-colors">
                {t.nav.demo}
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-500 transition-colors">
                {t.nav.contact}
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSelector />

              <Button
                asChild
                variant="ghost"
                className="text-white p-2 bg-gradient-to-r from-purple-500 to-blue-500 backdrop-blur-sm rounded-3xl"
              >
                <Link href="/handler/signup">Login</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageSelector />
            <button className="text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href="#features"
                className="text-gray-600 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.features}
              </Link>
              <Link
                href="#video-section"
                className="text-gray-600 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.demo}
              </Link>
              <Link
                href="#contact"
                className="text-gray-600 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>

              <Button
                asChild
                variant="ghost"
                className="text-white p-2 bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] backdrop-blur-sm rounded-3xl w-full mt-2"
              >
                <Link href="/handler/signup">Login</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

// Dummy Contact Component
// const Contact = () => {
//   const { language } = useLanguage()
//   const t = translations[language]

//   return (
//     <div className="contact-section">
//       <div className="contact-header">
//         <h2 className="text-gray-500">{t.footer.contact}</h2>
//       </div>
//       <div className="contact-container">
//         <div className="contact-item">
//           <div className="contact-icon">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <rect width="20" height="16" x="2" y="4" rx="2" />
//               <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//             </svg>
//           </div>
//           <div className="contact-info">
//             <p>aravsaxena884@gmail.com</p>
//           </div>
//         </div>
//         <div className="contact-item">
//           <div className="contact-icon">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//             </svg>
//           </div>
//           <div className="contact-info">
//             <p>+91 96534 13126</p>
//           </div>
//         </div>
//         <div className="contact-item">
//           <div className="contact-icon">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//               <circle cx="12" cy="10" r="3" />
//             </svg>
//           </div>
//           <div className="contact-info">
//             <p>Pune, India</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Dummy DeveloperInfo Component
// const DeveloperInfo = () => {
//   return (
//     <div className="developer-info text-center ">
//       <h3 className="section-title text-gray-500">Developer Info</h3>
//       <div className="developer-container">
//         <div className="developer-grid">
//           <div className="developer-card">
//             <div className="developer-image">
//               <img src="/arav.jpg" alt="Developer" />
//             </div>
//             <h4 className="developer-name"><IndiaGradient>Arav Saxena</IndiaGradient></h4>
//             <p className="developer-role">Lead Developer</p>
//             <p className="developer-bio">Full-stack developer with expertise in AI and healthcare solutions.</p>
//             <div className="developer-links">
//               <a href="#" className="dev-link">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
//                   <rect x="2" y="9" width="4" height="12"></rect>
//                   <circle cx="4" cy="4" r="2"></circle>
//                 </svg>
//               </a>
//               <a href="#" className="dev-link">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // Hero Section Component
// const HeroSection = () => {
//   const { language } = useLanguage()
//   const t = translations[language]

//   return (
//     <div className="relative w-full min-h-[100vh] ">
//       {/* Background Threads */}
//       <div className="absolute inset-0 z-0">
//         <Threads
//           amplitude={1}
//           distance={0}
//           enableMouseInteraction={true}
//         />
//       </div>

//       {/* Foreground Content */}
//       <BlurFade delay={0.7} inView>
//         <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-12 space-y-6 relative z-10">
//           <div className="flex flex-col md:flex-row items-center justify-center gap-8">
//             <div className="mb-4 md:mb-0 bg-transparent">
//               <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
//                 <RevealLinks
//                   text="Sales clarity is rare. Scalable insights aren’t. We bring you both"
//                   bgColor="bg-transparent"
//                   textColor="text-black"
//                   hoverColor="text-purple-200"
//                   interval={2000}
//                 />
//               </h1>
//             </div>

//             <div>
//               <FloatingPhone />
//             </div>
//           </div>

//           <Button
//             asChild
//             variant="ghost"
//             className="text-white p-6 pl-16 pr-16 bg-gradient-to-r from-purple-500 to-blue-500 backdrop-blur-sm rounded-3xl"
//           >
//             <Link href="/handler/signup">{t.hero.getStarted}</Link>
//           </Button>
//         </div>
//       </BlurFade>
//       <BlurFade delay={0.7} inView>
//         <div className="mt-16 relative z-10 flex flex-col gap-0 m-0 p-0">
//           <ScrollVelocity
//             texts={['BlueBox']} 
//             velocity={100} 
//             className="custom-scroll-text text-gray-500"
//           />
//         </div>
//       </BlurFade>
    
//     </div>
//   )
// }


// Features Section Component
const FeaturesSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const features = [
    {
      icon: <Heart className="w-10 h-10 text-red-500" />,
      title: t.features.personalizedCare.title,
      description: t.features.personalizedCare.description,
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-500" />,
      title: t.features.availability.title,
      description: t.features.availability.description,
    },
    {
      icon: <Shield className="w-10 h-10 text-green-500" />,
      title: t.features.secure.title,
      description: t.features.secure.description,
    },
  ]

  return (
    <section id="features" className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.3} inView>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
              {t.features.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>{t.features.heading}</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.features.description}</p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.2} inView>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6 p-4 rounded-full bg-gray-50 inline-block">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}




const WorldMapDemo = () => {
  return (
    <div className=" py-40 dark:bg-black  bg-gradient-to-r from-purple-50 to-blue-50 w-full">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
          <GradientText>Remote{" "}</GradientText>
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}>
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          Break free from traditional boundaries. Connect from anywhere, at the
          comfort of your own studio apartment. Perfect for Start-ups and
          low level Buisnesses.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]} />
    </div>
  );
}


// YouTube Video Section Component
const YouTubeSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="video-section" className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.3} inView>
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
              {t.video.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>{t.video.heading}</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.video.description}</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/JXIB8a73MIY"
                title={t.video.demo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">{t.video.demo}</h3>
                <p>{t.video.seeHow}</p>
              </div>
            </div>
          </div>
        </BlurFade>

        <div className="mt-12 text-center">
          <Button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all duration-300">
            <Link href="/handler/signup">{t.video.tryIt}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


const TryChatbotSection = () => {
  return (
    <section
      id="try-chatbot"
      className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 mt-10 rounded-3xl"
    >
      <div className="container mx-auto px-4">
        <BlurFade delay={0.3} inView>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-600 text-sm font-medium mb-4">
              Chat with BlueBox AI
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>Want to Try Our Chatbot?</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet <span className="font-semibold text-gradient-to-r from-purple-500 to-blue-500">BlueBox AI</span> — your smart AI business insights assistant. Whether you're curious about business insights, sales, marketing, or just need guidance, our chatbot is here 24/7.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <BlurFade delay={0.5} inView>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Bot className="w-10 h-10 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Human-Like Responses</h3>
              <p className="text-gray-600">
                BlueBox AI understands context and business insights using advanced natural language processing.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.7} inView>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <MessageCircle className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Instant Conversations</h3>
              <p className="text-gray-600">
                Get quick and accurate responses—just like talking to a real Human consultant.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.9} inView>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Activity className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                No wait times. No queues. Your virtual business insights assistant is always here for you.
              </p>
            </div>
          </BlurFade>
        </div>

        {/* CTA Button */}
        <BlurFade delay={1.2} inView>
          <div className="mt-16 text-center">
            <Link href="/chatbot" passHref>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:text-black">
                Try BlueBox for Free
              </button>
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>

  )
}



// Testimonials Section Component
const TestimonialsSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const testimonials = [
    {
      quote:
        "BlueBox AI has been a game-changer for managing my business insights. The 24/7 access to healthcare guidance gives me insights for better decision-making.",
      author: "Priya Sharma",
      role: "Business Owner",
      avatar: "/6703cd7c7b076c4bbe2e39910a4f5807.jpg?height=60&width=60",
    },
    {
      quote:
        "As a busy professional, I appreciate how BlueBox AI helps me make informed decisions for my business.",
      author: "Rahul Patel",
      role: "Business Executive",
      avatar: "/axa.jpeg?height=60&width=60",
    },
    {
      quote:
        "The insights provided by BlueBox AI have been invaluable for my business growth and decision-making.",
      author: "Anita Desai",
      role: "CTO",
      avatar: "/asojaK.jpg?height=60&width=60",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.3} inView>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-50 text-yellow-600 text-sm font-medium mb-4">
              {t.testimonials.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>{t.testimonials.heading}</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.testimonials.description}</p>
          </div>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.2} inView>
              <motion.div whileHover={{ y: -10 }} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

// Call to Action Section Component
const CTASection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.3} inView>
          <div className="bg-white rounded-3xl p-12 shadow-xl max-w-5xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-purple-50 to-blue-50 opacity-50 rounded-l-full"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <GradientText>{t.cta.heading}</GradientText>
                </h2>
                <p className="text-xl text-gray-600 mb-6">{t.cta.description}</p>
                <div className="flex flex-wrap gap-4">
                  <Button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all duration-300">
                    <Link href="/dashboard">{t.cta.getStarted}</Link>
                  </Button>
                  <Button variant="outline" className="px-8 py-3 border-2 rounded-full">
                    <Link href="#contact">{t.cta.contactUs}</Link>
                  </Button>
                </div>
              </div>

              <div className="w-full md:w-1/3 flex justify-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src="/f2881fdf-d2ac-41a3-8c0a-7e9c30219a74.png"
                    alt="Healthcare illustration"
                    className="w-60 h-60"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={1.2} inView>
      </BlurFade>
      </div>
    </section>
  )
}

const items = [
  {
  image: '/e5385861-45f3-4b25-a1fc-7281293dc5df.png?grayscale',
  link: 'http://localhost:3000/dashboard',
  title: '',
  description: 'Want to grow your business?'
  },
  {
  image: '/mll.jpg?grayscale',
  link: 'http://localhost:3000/dashboard',
  title: '',
  description: 'Start your journey with us today'
  },
  {
  image: '/e5385861-45f3-4b25-a1fc-7281293dc5df.png?height=400&width=400?grayscale',
  link: 'http://localhost:3000/dashboard',
  title: '',
  description: 'Your company needs BlueBox AI'
  },
  {
  image: '/Sales-and-Marketing-Sales.png?grayscale',
  link: 'http://localhost:3000/dashboard',
  title: '',
  description: 'Want to Boost your business?'
  }
  ];

 

// Footer Component
const Footer = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer id="contact" className="py-10 bg-gradient-to-r from-purple-50 to-blue-50 border-t border-gray-100 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/f2881fdf-d2ac-41a3-8c0a-7e9c30219a74.png?height=40&width=40" alt="logo" width={40} height={35} />
              <GradientText className="text-2xl font-semibold">BlueBox AI</GradientText>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">{t.footer.description}</p>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} BlueBox AI. {t.footer.rights}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t.nav.features}
                </Link>
              </li>
              <li>
                <Link href="#video-section" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t.nav.demo}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                aravsaxena884@gmail.com
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 96534 13126
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Pune, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">{t.footer.designedWith}</p>

          <div className="flex gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/arav7781"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 
      0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 
      1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.3-5.467-1.334-5.467-5.933 
      0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3-.404c1.02.005 
      2.045.138 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 
      1.235 3.22 0 4.61-2.807 5.63-5.48 5.922.43.37.823 1.102.823 2.222 
      0 1.606-.015 2.896-.015 3.286 0 .32.218.694.825.576C20.565 21.795 
      24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.instagram.com/arav_6555"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 
                  2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 
                  5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 
                  1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}


const ThreeDMarqueeDemo = () => {
  const images = [
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",
    "/mll.jpg",

  ];
  return (
    <div
      className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800 shadow-none">
      <ThreeDMarquee images={images} />
    </div>
  );
}

const words = [
 
  {
    text: "Hoverrrr!!!😄",
    className: "text-blue-500 dark:text-blue-500 space-y-4",
  },
];

const MacbookScrollDemo = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50 w-full p-0 m-0">
      <MacbookScroll
        title={
     <GradientText>
      </GradientText> 
        
        }
        badge={
          <Link href="http://localhost:3000/dashboard">
            <Badge className="h-10 w-10 transform -rotate-12" />
          </Link>
        }
        src="/x1.png"
        showGradient={false}
      />
    </div>
  );
}
const Badge = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z" fill="#00AA45" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#219653"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
        fill="#24292E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
        fill="#24292E"
      />
    </svg>
  );
};

 

export const products = [
  {
    title: "Dashboard",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b1.png",
  },
  {
    title: "Product Designing",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/x0.png",
  },
  {
    title: "Sales",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b222.png",
  },
 
  {
    title: "Process",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b4.png",
  },
  {
    title: "Designing Specs",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b5.jpg",
  },
  {
    title: "Business Intelligence",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b6.png",
  },
 
  {
    title: "Strategy",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b4.png",
  },
  {
    title: "Dashboard",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b5.jpg",
  },
  {
    title: "Designing",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b6.png",
  },
  {
    title: "Product",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b22.jpg",
  },
  {
    title: "Dashboard",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b1.png",
  },
 
  {
    title: "Product Demo",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b22.jpg",
  },
  {
    title: "Sales and Marketing",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/x9.png",
  },
  {
    title: "Product Development",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/x77.png",
  },
  {
    title:"Business Intelligence",
    link: "http://localhost:3000/dashboard",
    thumbnail:
      "/b5.jpg",
  },
];

// Main LandingPage Component
const LandingPage = () => {
  return (
    <LanguageProvider>
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 min-h-screen ">

        <Header />
      

        {/* Hero Section with Enhanced Animation */}
        <HeroParallax products={products} />
        <div className="p-0 gap-0">
          <MacbookScrollDemo />
        </div>
        <TracingBeam className="px-6">
        <TryChatbotSection />
        <FeaturesSection />
        <WorldMapDemo/>

        {/* YouTube Video Section */}
        <YouTubeSection />
        </TracingBeam>
        <div className="relative z-10 h-[600px] w-full overflow-hidden rounded-lg border bg-gradient-to-r from-purple-50 to-blue-50">
      <Testimonials/>
    </div>

        <ThreeDMarqueeDemo />
    

        {/* Testimonials with Animation */}
        {/* <TestimonialsSection /> */}
       
    
  
        {/* Call to Action */}
        <CTASection />
        <hr className="my-10" />
        {/* Footer */}
        <Footer />
     
      </div>
    </LanguageProvider>
  )
}

export default LandingPage
