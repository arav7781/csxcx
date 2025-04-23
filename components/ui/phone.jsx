"use client";
import { motion } from "framer-motion";
import { FiBatteryCharging, FiWifi, FiBarChart2, FiDatabase, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

const FloatingPhone = () => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(-30deg) rotateX(15deg)",
      }}
      className="relative rounded-[40px] bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl shadow-blue-500/20"
    >
      {/* iPhone notch */}
      <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-gray-900"></div>
      
      {/* Camera bump - Updated for titanium look */}
      <div className="absolute -right-1 top-1/2 z-10 h-24 w-1 -translate-y-1/2 rounded-l-lg bg-gradient-to-r from-gray-500 to-gray-600 shadow-sm"></div>
      <div className="absolute -right-1 top-1/2 z-0 h-16 w-2 -translate-y-1/2 rounded-l-md bg-gradient-to-r from-gray-600 to-gray-700/80"></div>

      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className="relative h-96 w-56 rounded-[38px] border-8 border-gray-900 bg-gray-900 p-1"
      >
        {/* Metallic frame - Updated for titanium look */}
        <div 
          className="absolute inset-0 rounded-[30px] border-[6px] bg-gradient-to-b from-gray-400 to-gray-600 shadow-inner pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)",
            backgroundSize: "4px 4px", // Subtle brushed metal texture
          }}
        ></div>

        <HeaderBar />
        <Screen />
        
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 z-20 h-1 w-16 -translate-x-1/2 rounded-full bg-white/30"></div>
      </motion.div>
      
      {/* Side buttons - Updated for titanium look */}
      <div className="absolute -left-1 top-24 h-16 w-1 rounded-r-sm bg-gradient-to-b from-gray-400 to-gray-600 shadow-sm"></div>
      <div className="absolute -left-1 top-44 h-10 w-1 rounded-r-sm bg-gradient-to-b from-gray-400 to-gray-600 shadow-sm"></div>
      <div className="absolute -right-1 top-32 h-20 w-1 rounded-l-sm bg-gradient-to-b from-gray-400 to-gray-600 shadow-sm"></div>
    </div>
  );
};

const HeaderBar = () => {
  return (
    <>
      <div className="absolute left-[50%] top-2.5 z-10 h-2 w-16 -translate-x-[50%] rounded-md bg-gray-900"></div>
      <div className="absolute right-3 top-2 z-10 flex gap-2">
        <FiWifi className="text-gray-400" />
        <FiBatteryCharging className="text-gray-400" />
      </div>
    </>
  );
};

const Screen = () => {
  return (
    <div className="relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[30px] bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Enhanced BlueBox AI Logo */}
      <div className="absolute top-6 flex flex-col items-center">
        <motion.div 
          className="mb-2 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-4 shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            repeat: Infinity,
            repeatType: "mirror",
            duration: 3,
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <FiDatabase className="h-8 w-8 text-white" />
            <motion.div 
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-blue-800">BlueBox</h1>
          <div className="flex items-center justify-center gap-1">
            <p className="text-sm font-medium text-blue-600">AI</p>
            <motion.div 
              className="h-1 w-1 rounded-full bg-blue-600"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-sm font-medium text-blue-600">Analytics</p>
          </div>
        </motion.div>
      </div>

      {/* Data Visualization Elements */}
      <div className="absolute top-36 grid w-full grid-cols-3 gap-2 px-4">
        <motion.div 
          className="flex flex-col items-center rounded-lg bg-white p-2 shadow-sm"
          whileHover={{ y: -5 }}
        >
          <FiBarChart2 className="h-5 w-5 text-blue-600" />
          <p className="mt-1 text-xs font-medium">Insights</p>
        </motion.div>
        <motion.div 
          className="flex flex-col items-center rounded-lg bg-white p-2 shadow-sm"
          whileHover={{ y: -5 }}
        >
          <FiTrendingUp className="h-5 w-5 text-blue-600" />
          <p className="mt-1 text-xs font-medium">Trends</p>
        </motion.div>
        <motion.div 
          className="flex flex-col items-center rounded-lg bg-white p-2 shadow-sm"
          whileHover={{ y: -5 }}
        >
          <FiDatabase className="h-5 w-5 text-blue-600" />
          <p className="mt-1 text-xs font-medium">Data</p>
        </motion.div>
      </div>

      {/* Mini Dashboard */}
      <div className="absolute top-52 w-full px-4">
        <div className="rounded-lg bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-800">Revenue</span>
            <span className="text-xs font-bold text-green-500">+24%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-blue-100">
            <motion.div 
              className="h-2 rounded-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <motion.div 
        className="absolute -bottom-32 left-[50%] h-64 w-64 -translate-x-[50%] rounded-full bg-blue-400 opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Get Started Button */}
      <Link href="/dashboard" passHref>
        <motion.button
          className="absolute bottom-4 left-4 right-4 z-10 rounded-lg border border-blue-200 bg-blue-600 py-2 text-sm font-medium text-white shadow-lg backdrop-blur"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Launch Dashboard
        </motion.button>
      </Link>
    </div>
  );
};

export default FloatingPhone;