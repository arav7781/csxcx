import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const RevealLinks = ({ 
  text = "Flourish with Smarter Decisions",
  textSize = "text-2xl sm:text-7xl md:text-6xl lg:text-4xl", // Smaller text sizes
  bgColor = "bg-transparent",
  textColor = "text-black",
  hoverColor = "text-purple-300",
  duration = 0.3, // Slightly longer duration for smoother transition
  stagger = 0.02, // Reduced stagger for smoother effect
  autoAnimate = true,
  interval = 3000,
  className = ""
}) => {
  const controls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted || !autoAnimate) return;

    let isActive = true;

    const animate = async () => {
      while (isActive) {
        try {
          await controls.start("hovered");
          await new Promise(resolve => setTimeout(resolve, interval));
          await controls.start("initial");
          await new Promise(resolve => setTimeout(resolve, interval));
        } catch (e) {
          // Animation interrupted (likely due to unmount)
          break;
        }
      }
    };

    animate();

    return () => {
      isActive = false;
    };
  }, [isMounted, autoAnimate, controls, interval]);

  // Split text into words while preserving spaces
  const words = text.split(/(\s+)/).filter(word => word.trim().length > 0 || word === " ");

  return (
    <section className={`grid  gap-1 ${bgColor}  ${textColor} ${className}`}>
      {words.map((word, index) => (
        <React.Fragment key={`word-${index}`}>
          {word === " " ? (
            <div className="w-4" /> // Space between words
          ) : (
            <FlipLink 
              text={word} 
              controls={controls}
              textSize={textSize}
              duration={duration}
              stagger={stagger}
              hoverColor={hoverColor}
            />
          )}
        </React.Fragment>
      ))}
    </section>
  );
};

const FlipLink = ({ 
  text, 
  controls, 
  textSize, 
  duration, 
  stagger, 
  hoverColor 
}) => {
  return (
    <motion.div
      initial="initial"
      animate={controls}
      className={`relative inline-block overflow-hidden whitespace-nowrap font-black uppercase ${textSize}`}
      style={{ lineHeight: 0.9 }} // Adjusted line height
    >
      <div className="inline-flex">
        {text.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0, opacity: 1 },
              hovered: { y: "-100%", opacity: 0 }
            }}
            transition={{
              duration: duration,
              ease: [0.16, 1, 0.3, 1], // Custom easing for smoother effect
              delay: stagger * i,
            }}
            className="inline-block"
            key={`top-${i}`}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 inline-flex">
        {text.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%", opacity: 0 },
              hovered: { y: 0, opacity: 1 }
            }}
            transition={{
              duration: duration,
              ease: [0.16, 1, 0.3, 1], // Matching easing
              delay: stagger * i,
            }}
            className={`inline-block ${hoverColor}`}
            key={`bottom-${i}`}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

// Usage example:
// <RevealLinks 
//   text="Data Driven Results" 
//   bgColor="bg-gradient-to-r from-blue-600 to-indigo-600"
//   textColor="text-white"
//   hoverColor="text-green-300"
//   interval={2500}
//   className="rounded-lg"
// />