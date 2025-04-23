"use client"

import { useState, useEffect } from "react"
import FeaturesAssistants from "./_components/FeaturesAssistants"
import History from "./_components/History"
import Feedback from "./_components/Feedback"
import ProductDescription from "./_components/ProductDescription"
import DeveloperInfo from "./_components/DeveloperInfo"
import { BlurFade } from "@/components/magicui/blur-fade"
import IndiaGradient from "@/components/ui/IndiaGradient"
import Link from "next/link"
import AppHeader from "../_components/AppHeader"
import { ArrowRight, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import GradientText from "@/components/ui/GradientText"
import { motion } from "framer-motion"
import Threads from "@/components/ui/wave"
import WebFaetues from "./_components/WebFaetues"
import CircularGallery from "@/components/ui/gallery"
import { Vortex } from "@/components/ui/vortex"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import Image from "next/image"
import { TextComponent } from "./_components/fea"
import { cn } from "@/lib/utils";

// Health quotes list
const businessQuotes = [
  "Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau",
  "Don’t watch the clock; do what it does. Keep going. — Sam Levenson",
  "Opportunities don't happen. You create them. — Chris Grosser",
  "Success is not in what you have, but who you are. — Bo Bennett",
  "Dream big. Start small. Act now. — Robin Sharma",
  "It’s not about ideas. It’s about making ideas happen. — Scott Belsky",
  "Whether you think you can or you think you can't, you're right. — Henry Ford",
  "Do not be embarrassed by your failures, learn from them and start again. — Richard Branson",
  "Success is walking from failure to failure with no loss of enthusiasm. — Winston Churchill",
  "The only limit to our realization of tomorrow will be our doubts of today. — Franklin D. Roosevelt",
  "Don't be afraid to give up the good to go for the great. — John D. Rockefeller",
  "If you really look closely, most overnight successes took a long time. — Steve Jobs",
  "Play by the rules, but be ferocious. — Phil Knight",
  "Growth and comfort do not coexist. — Ginni Rometty",
  "Chase the vision, not the money; the money will end up following you. — Tony Hsieh",
  "Don’t sit down and wait for the opportunities to come. Get up and make them. — Madam C.J. Walker",
  "A big business starts small. — Richard Branson",
  "The secret of change is to focus all your energy not on fighting the old, but on building the new. — Socrates",
  "If you're not a risk taker, you should get the hell out of business. — Ray Kroc",
  "Great things in business are never done by one person. They're done by a team of people. — Steve Jobs",
  "It’s fine to celebrate success, but it is more important to heed the lessons of failure. — Bill Gates",
  "Business opportunities are like buses, there's always another one coming. — Richard Branson",
  "Do what you love and success will follow. Passion is the fuel behind a successful career. — Meg Whitman",
  "In the middle of difficulty lies opportunity. — Albert Einstein",
  "I never dreamed about success. I worked for it. — Estée Lauder",
  "Logic will get you from A to B. Imagination will take you everywhere. — Albert Einstein",
  "Success isn’t just about what you accomplish in your life; it’s about what you inspire others to do. — Unknown",
  "You miss 100% of the shots you don’t take. — Wayne Gretzky",
  "Stay hungry. Stay foolish. — Steve Jobs",
  "Be undeniably good. No marketing effort or social media buzzword can be a substitute for that. — Anthony Volodkin",
  "Act enthusiastic and you will be enthusiastic. — Dale Carnegie",
  "Perseverance is failing 19 times and succeeding the 20th. — Julie Andrews",
  "Your time is limited, so don’t waste it living someone else’s life. — Steve Jobs",
  "Discipline is the bridge between goals and accomplishment. — Jim Rohn",
  "The best way to predict the future is to create it. — Peter Drucker",
  "If you define yourself by how you differ from the competition, you’re probably in trouble. — Omar Hamoui",
  "When something is important enough, you do it even if the odds are not in your favor. — Elon Musk",
  "Innovation distinguishes between a leader and a follower. — Steve Jobs",
  "Risk more than others think is safe. Dream more than others think is practical. — Howard Schultz",
  "Don’t deliver a product, deliver an experience. — Unknown",
  "The road to success and the road to failure are almost exactly the same. — Colin R. Davis",
  "Success is not final; failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
  "Every problem is a gift—without problems we would not grow. — Tony Robbins",
  "Done is better than perfect. — Sheryl Sandberg",
  "An idea is worthless without execution. — Gary Vaynerchuk",
  "The harder you work, the luckier you get. — Gary Player",
  "Don’t be busy. Be productive. — Unknown",
  "Challenging the status quo is what drives progress. — Indra Nooyi",
  "Do not wait for the perfect time, take time and make it perfect. — Unknown",
];

const footer = {
  description:
    "AI-powered business assistant available 24/7 to address your business concerns and provide guidance with personalized insights.",
  rights: "All rights reserved.",
  quickLinks: "Quick Links",
  contact: "Contact",
  designedWith: "Designed with ❤️ by DataWizards",
}

const nav = {
  home: "Home",
  features: "Features",
  demo: "Demo",
  contact: "Contact",
}

const Footer = () => {
  return (
    <footer id="contact" className="py-10 bg-gradient-to-r from-purple-50 to-blue-50 w-full rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/f2881fdf-d2ac-41a3-8c0a-7e9c30219a74.png" alt="logo" width={40} height={35} />
              <GradientText className="text-2xl font-semibold">BlueBox AI</GradientText>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">{footer.description}</p>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} BlueBox AI. {footer.rights}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {nav.features}
                </Link>
              </li>
              <li>
                <Link
                  href="#video-section"
                  className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {nav.demo}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-600 hover:text-blue-500 transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                <Mail className="h-5 w-5" />
                github@7781
              </li>
              <li className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                <Phone className="h-5 w-5" />
                +91 96534 13126
              </li>
              <li className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                <MapPin className="h-5 w-5" />
                Pune, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">{footer.designedWith}</p>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-50"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-pink-500 transition-colors p-2 rounded-full hover:bg-pink-50"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-blue-50"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
const HeroScrollDen = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Buiness Intelligence 
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="/x2.jpeg"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

const data = [
  {
    title: "Easy to Use",
    content: "Our BlueBox AI is built with simplicity in mind, so you can focus on building your business.",
    srcImage: "/a3.jpg",
  },
  {
    title: "Chatbot Assistance",
    content: "Our chatbots are designed to help you with your sales and marketing needs.",
    srcImage: "/a4.png",
  },
  {
    title: "Voice-to-Voice",
    content: "Our voice-to-voice multilingual chatbots can help you with your sales and marketing needs.",
    srcImage: "/a1.jpg",
  },
  {
    title: "Vision",
    content: "Our vision capabilities can help you with your product design and marketing needs.",
    srcImage: "/a2.jpg",
  },
];

const FeatureFourImages = () => {
  const [featureOpen, setFeatureOpen] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 10);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer > 10000) {
      setFeatureOpen((prev) => (prev + 1) % data.length);
      setTimer(0);
    }
  }, [timer]);

  return (
    <div className="container">
      <div className="mb-20 text-center">
        <p className="mb-2 text-sm font-medium uppercase text-neutral-500">
          How does it work?
        </p>
        <h2 className="mb-4 text-3xl font-semibold tracking-tighter text-neutral-800 dark:text-neutral-300">
          <GradientText>How to use the BlueBox for your Buisness?</GradientText>
        </h2>
      </div>

      {/* On mobile, use flex-col to stack; on md+, use grid-cols-2 */}
      <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-4 ">
        <div className="space-y-6">
          {data.map((item, index) => (
            <button
              className="w-full"
              key={item.title}
              onClick={() => {
                setFeatureOpen(index);
                setTimer(0);
              }}
              type="button"
            >
              <TextComponent
                content={item.content}
                isOpen={featureOpen === index}
                loadingWidthPercent={featureOpen === index ? timer / 100 : 0}
                number={index + 1}
                title={item.title}
              />
            </button>
          ))}
        </div>

        <div className="h-full mb-6 md:mb-0">
          <div
            className={cn(
              "relative h-96 w-full overflow-hidden rounded-lg md:h-[500px]"
            )}
          >
            {data.map((item, index) => (
              <img
                alt={item.title}
                className={cn(
                  "absolute h-[500px] w-full transform-gpu rounded-lg object-cover transition-all duration-300",
                  featureOpen === index ? "scale-100" : "scale-70",
                  featureOpen > index ? "translate-y-full" : ""
                )}
                key={item.title}
                src={item.srcImage}
                style={{ zIndex: data.length - index }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function DashBoard() {
  const [quote, setQuote] = useState("")

  // Get a random quote when the component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * businessQuotes.length)
    setQuote(businessQuotes[randomIndex])
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-50 to-blue-50">
      <AppHeader />

      {/* Main Content Container */}
      <div className="mt-1 pt-7 w-full max-w-[1800px] mx-auto space-y-8 px-4 sm:px-6 lg:px-8 pb-12">

        {/* Health Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-transparent backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50 overflow-hidden"
        >
          <Vortex>
            <div className="rounded-2xl overflow-hidden w-full">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full">
                <div className="bg-white/80 rounded-full p-3 shadow-md">
                  <Quote className="h-6 w-6 text-[#2AC9AF]" />
                </div>
                <p className="text-gray-300 italic font-medium text-sm sm:text-base flex-1 min-w-0">
                  {quote}
                </p>
              </div>
            </div>
          </Vortex>
        </motion.div>

        <BlurFade delay={0.3} inView>

       
        {/* Features Section */}
          {/* Features Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-100">
      
            <div
              style={{
                height: '600px',
                position: 'relative',
                padding: '4px',
                overflow: 'hidden', // Make sure child content stays within bounds
                borderRadius: '1rem', // Matches Tailwind's rounded-2xl
              }}
            >
          <FeaturesAssistants />

          <BlurFade delay={0.5} inView>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mt-8 border border-white/50">
              <h2 className="text-xl sm:text-2xl text-gray-700 text-center px-2 font-medium">
                Video Consulting will be coming soon!
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <History />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <Feedback />
              </div>
            </div>
          </BlurFade>
        </div>
     
        </div>

        </BlurFade>
        <BlurFade delay={0.5} inView>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden text-center">
          <FeatureFourImages />
        </div>
        </BlurFade>
        <BlurFade delay={0.5} inView>
        <div>
          <HeroScrollDen />
        </div>
        </BlurFade>
       
        {/* Daily Health Tips */}
        <BlurFade delay={0.5} inView>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="text-center mb-8">
              <GradientText as="h2" className="text-2xl font-bold mb-2">
                Want to Grow?
              </GradientText>
              <p className="text-gray-600">Track your progress and stay motivated with personalized business insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-white/50 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#2AC9AF]"
                  >
                    <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
                    <path d="M2 20h20"></path>
                    <path d="M14 12v.01"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Track Your Progress</h3>
                <p className="text-gray-600">Monitor your business metrics and see your improvement over time</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-white/50 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#4B79D9]"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Personalized Care</h3>
                <p className="text-gray-600">Get recommendations tailored to your unique business profile</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-white/50 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#2AC9AF]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v4l2 2"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Timely Reminders</h3>
                <p className="text-gray-600">Never miss your business appointments with smart alerts</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Product Description Section */}
        <BlurFade delay={0.5} inView>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-100">
            <ProductDescription />
          </div>
        </BlurFade>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-full">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: 0.5,
                  }}
                >
                  <GradientText as="h1" className="text-3xl md:text-2xl font-bold mb-2 text-center">
                    Enjoying? might want to go PRO
                  </GradientText>
                </motion.div>
              </motion.div>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all rounded-full px-6 py-6 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              <Link href="/Docs">Go Pro</Link>
            </Button>
          </div>
        </div>
       


        {/* Developer Info Section */}
        <div className="w-full">
          <BlurFade delay={0.5} inView>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6  shadow-md border border-gray-100">
                <DeveloperInfo />
      </div>
      
          </BlurFade>
        </div>

        {/* Footer Section */}
        <BlurFade delay={0.5} inView>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100">
            <Footer />
          </div>
        </BlurFade>
      </div>
    </div>
  )
}

export default DashBoard
