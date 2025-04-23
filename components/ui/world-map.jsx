"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function WorldMapIndia({
  dots = [],
  lineColor = "#FF9933" // Saffron color inspired by Indian flag
}) {
  const svgRef = useRef(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.3,
    color: theme === "dark" ? "#FFFFFF60" : "#00000060",
    shape: "circle",
    backgroundColor: theme === "dark" ? "#1a1a1a" : "#f0f0f0",
  });

  const projectPoint = (lat, lng) => {
    // Adjusted to center on India (approx lat: 20°N, lng: 78°E)
    const x = (lng - 30) * (800 / 120); // Narrower longitude range for focus
    const y = (60 - lat) * (400 / 90); // Adjusted for India's latitude range
    return { x, y };
  };

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 80; // More pronounced curve
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      className="w-full aspect-[2/1] dark:bg-gray-900 bg-gradient-to-r from-orange-100 via-green-100 to-blue-100 rounded-lg relative font-sans overflow-hidden"
    >
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none opacity-80"
        alt="India map"
        height={495}
        width={1056}
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 0.3 * i,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                }}
                key={`path-${i}`}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9933" stopOpacity="0" />
            <stop offset="10%" stopColor="#138808" stopOpacity="1" />
            <stop offset="50%" stopColor="#000080" stopOpacity="1" />
            <stop offset="90%" stopColor="#138808" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF9933" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <motion.circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill="#FF9933"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 1,
                  delay: 0.3 * i,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
              <motion.circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="3"
                fill="#138808"
                initial={{ scale: 0, opacity: 0.7 }}
                animate={{ scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  duration: 2,
                  delay: 0.3 * i,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </g>
            <g key={`end-${i}`}>
              <motion.circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill="#000080"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 1,
                  delay: 0.3 * i,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
              <motion.circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="3"
                fill="#FF9933"
                initial={{ scale: 0, opacity: 0.7 }}
                animate={{ scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  duration: 2,
                  delay: 0.3 * i,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}