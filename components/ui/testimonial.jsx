"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import GradientText from "./GradientText";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        overflow: "hidden",
        padding: "8px",
        gap: "1rem",
        flexDirection: vertical ? "column" : "row",
        height: vertical ? "400px" : "auto",
        ...props.style,
      }}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexShrink: 0,
              gap: "1rem",
              flexDirection: vertical ? "column" : "row",
              animation: vertical
                ? `marquee-vertical ${props.style?.["--duration"] || "20s"} linear infinite`
                : `marquee ${props.style?.["--duration"] || "20s"} linear infinite`,
              animationDirection: reverse ? "reverse" : "normal",
              willChange: "transform",
            }}
            onMouseEnter={(e) => pauseOnHover && (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={(e) => pauseOnHover && (e.currentTarget.style.animationPlayState = "running")}
          >
            {children}
            {children}
          </div>
        ))}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}

function Highlight({ children }) {
  return (
    <span
      style={{
        backgroundColor: "#f0abfc",
        padding: "2px 4px",
        fontWeight: "bold",
        color: "#d946ef",
        borderRadius: "4px",
      }}
    >
      {children}
    </span>
  );
}

function TestimonialCard({ description, name, img, role }) {
  return (
    <div
      style={{
        marginBottom: "1rem",
        width: "100%",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1.5rem",
        borderRadius: "12px",
        padding: "1rem",
        border: "1px solid #e5e5e5",
        backgroundColor: "#fff",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          fontWeight: 400,
          color: "#4b5563",
        }}
      >
        {description}
        <div style={{ display: "flex", flexDirection: "row", paddingTop: "8px" }}>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} size={16} style={{ fill: "#facc15", color: "#facc15" }} />
            ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "1rem",
        }}
      >
        <Image
          width={40}
          height={40}
          src="/asojaK.jpg"
          alt={name}
          style={{
            borderRadius: "50%",
            border: "1px solid #e5e5e5",
            objectFit: "cover",
          }}
        />
        <div>
          <p style={{ fontWeight: 500, color: "#6b7280", margin: 0 }}>{name}</p>
          <p style={{ fontSize: "12px", fontWeight: 400, color: "#9ca3af", margin: 0 }}>
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: "Chinatsu",
    role: " Product Designer at InnovateTech",
    img: "/asojaK.jpg",
    description: (
      <p>
        Using BlueBox has revolutionized our design process.{" "}
        <Highlight>
          Its Vision Model makes it easy to deliver cutting-edge
          designs.
        </Highlight>{" "}
        A must-have for any design team.
      </p>
    ),
  },
  {
    name: "Samantha Lee",
    role: "Sales head at NextGen Solutions",
    img: "/axa.webp",
    description: (
      <p>
        Using BlueBox has drastically improved our Sales.{" "}
        <Highlight>
          We've seen a drastic increase in sales.
        </Highlight>{" "}
        Highly recommend it to fellow salespeople.
      </p>
    ),
  },
  {
    name: "Raj Patel",
    role: "Founder at Startup Studio",
    img: "/dd.webp",
    description: (
      <p>
        As a startup founder, I need tools that help us grow fast without
        sacrificing quality. BlueBox's stunning BI and analytics
        have made it an essential part of our workflow.{" "}
        <Highlight>Our Sales have improved by 40%.</Highlight>
      </p>
    ),
  },
];

export function Testimonials() {
  return (
    <section className="bg-gradient-to-r from-purple-50 to-blue-50"
      style={{
        padding: "2.5rem 1rem",
        maxWidth: "1200px",
        margin: "0 auto", // Updated gradient background
      }}
    >
      <h2
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          lineHeight: 1.2,
          textAlign: "center",
          marginBottom: "1rem",
          color: "#111",
        }}
      >
        <GradientText>What People Are Saying</GradientText>
      </h2>
      <h3
        style={{
          maxWidth: "600px",
          margin: "0 auto 2rem",
          textAlign: "center",
          fontSize: "1.125rem",
          fontWeight: 500,
          color: "rgba(0, 0, 0, 0.7)",
        }}
      >
        Don’t just take our word for it. Here’s what{" "}
        <span style={{ color: "transparent", background: "linear-gradient(to right, #9333ea, #f472b6)", WebkitBackgroundClip: "text" }}>
          real people
        </span>{" "}
        are saying about{" "}
        <span style={{ color: "#9333ea" }}>BlueBox AI</span>
      </h3>

      <div style={{ position: "relative", marginTop: "1.5rem", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "nowrap" }}>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} style={{ flex: "1", minWidth: "300px" }}>
                <Marquee
                  vertical
                  reverse={i % 2 === 1}
                  pauseOnHover
                  style={{
                    "--duration": `${20 + i * 5}s`,
                  }}
                >
                  {testimonials.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: Math.random() * 0.5,
                        duration: 0.8,
                      }}
                    >
                      <TestimonialCard {...card} />
                    </motion.div>
                  ))}
                </Marquee>
              </div>
            ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "25%",
            background: "linear-gradient(to top, white, transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "25%",
            background: "linear-gradient(to bottom, white, transparent)",
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}

export default Testimonials;