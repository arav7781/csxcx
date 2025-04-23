"use client"

import { motion } from "framer-motion"
import CountUp from "react-countup"
import IndiaGradient from "@/components/ui/IndiaGradient"
import GradientText from "@/components/ui/GradientText"
import Image from "next/image"

export function ProductDescription() {
  const stats = [
    { label: "Availability", value: "24/7", isNumber: false },
    { label: "Accuracy", value: 84, suffix: "%", isNumber: true },
    { label: "Users", value: 1, suffix: "+", isNumber: true },
  ]

  const statsVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } },
  }

  const statItemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <section className="product-description">
      <div className="product-container bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-2">
        <motion.div
          className="product-content"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>
            <IndiaGradient>Revolutionizing Business Intelligence</IndiaGradient>
          </h2>
          <p>
            BlueBox is an AI-powered business assistant designed to provide immediate business guidance and
            support. Our platform combines advanced artificial intelligence with business expertise to deliver
            personalized business solutions accessible to everyone, anytime, anywhere.
          </p>
          <p>
            Whether you're experiencing business challenges and need quick advice, seeking information about business
            operations, or looking for preventive business tips, BlueBox is your trusted companion for all business-related
            concerns.
          </p>
          <motion.div className="product-stats" initial="hidden" animate="show" variants={statsVariants}>
            {stats.map((stat, index) => (
              <motion.div key={index} className="stat-item" variants={statItemVariants}>
                <GradientText as="span" className="stat-number">
                  {stat.isNumber ? <CountUp end={stat.value} duration={2} suffix={stat.suffix} /> : stat.value}
                </GradientText>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="product-image"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="image-container rounded-2xl overflow-hidden animate-pulse">
            <div className="glow-effect"></div>
            {/* <video className="rounded-video" autoPlay loop muted playsInline>
              <source src="/IMG_0458.MP4" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            <Image src="/f2881fdf-d2ac-41a3-8c0a-7e9c30219a74.png" alt="Product" className="rounded-2xl" width={300} height={300}/>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductDescription
