"use client";

import { motion } from "framer-motion";
import GradientText from "@/components/ui/GradientText";
import { BlurFade } from "@/components/magicui/blur-fade";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

// const DeveloperInfo = () => {
//   const developers = [
//     {
//       name: "Arav Saxena",
//       role: "Lead Developer",
//       bio: "Passionate about cricket and coding, Arav built the core chatbot logic for real-time SQL insights in pharma distribution.",
//       image: "/arav.jpg",
//       github: "https://github.com/arav7781",
//       linkedin: "https://linkedin.com/in/aravsaxena",
//     },
//     {
//       name: "Shrey Raj",
//       role: "UI/UX Designer",
//       bio: "Crafted intuitive interfaces for seamless data interaction in healthcare.",
//       image: "/shreyy.jpg",
//       github: "",
//       linkedin: "",
//     },
//     {
//       name: "Riddhima Deshmukh",
//       role: "Python Developer",
//       bio: "Developed robust backend logic for SQL query processing, with a love for theatre and coffee.",
//       image: "/rid.jpg",
//       github: "https://github.com/ridds-io",
//       linkedin: "https://www.linkedin.com/in/riddhima-deshmukh-45759730a",
//     },
//     // {
//     //   name: "Devank Upadhaya",
//     //   role: "Software Developer",
//     //   bio: "Specialized in multimodal data handling for pharma analytics.",
//     //   image: "/dev.jpg",
//     //   github: "",
//     //   linkedin: "",
//     // },
//     // {
//     //   name: "Nandini Patawri",
//     //   role: "GenAI",
//     //   bio: "Integrated generative AI for advanced business insights.",
//     //   image: "/nand.jpg",
//     //   github: "",
//     //   linkedin: "",
//     // },
//     // {
//     //   name: "Kartik Mehta",
//     //   role: "MLops",
//     //   bio: "Streamlined ML pipelines for scalable data processing.",
//     //   image: "/911677.jpg",
//     //   github: "",
//     //   linkedin: "",
//     // },
//   ];

//   return (
//     <section className="py-6 bg-gray-50 dark:bg-gray-900">
//       <BlurFade delay={0.5} inView>
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="w-full text-center">
//             <GradientText as="h2" className="text-center text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-green-600">
//               Meet Our Team
//             </GradientText>
//           </div>

//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {developers.map((dev, index) => (
//               <CardContainer key={dev.name} className="w-full">
//                 <motion.div
//                   className="w-full"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.2 }}
//                 >
//                   <CardBody className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
//                     <CardItem translateZ="100" className="w-full mt-4">
//                       <div className="flex justify-center">
//                         <img
//                           src={dev.image}
//                           alt={`${dev.name}'s profile`}
//                           className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
//                           onError={(e) => (e.target.src = "/placeholder.jpg")}
//                         />
//                       </div>
//                     </CardItem>
//                     <CardItem>
//                       <div className="text-center">
//                         <GradientText as="h3" className="text-xl font-semibold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-600">
//                           {dev.name}
//                         </GradientText>
//                         <p className="text-gray-600 dark:text-gray-400 mt-1 text-base">{dev.role}</p>
//                         <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">{dev.bio}</p>
//                         <div className="flex justify-center gap-4 mt-4">
//                           {dev.github && (
//                             <a
//                               href={dev.github}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
//                               aria-label={`Visit ${dev.name}'s GitHub profile`}
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="18"
//                                 height="18"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 className="transition-colors duration-300"
//                               >
//                                 <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
//                                 <path d="M9 18c-4.51 2-5-2-7-2" />
//                               </svg>
//                             </a>
//                           )}
//                           {dev.linkedin && (
//                             <a
//                               href={dev.linkedin}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-gray-600Bot Response: hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
//                               aria-label={`Visit ${dev.name}'s LinkedIn profile`}
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="18"
//                                 height="18"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 className="transition-colors duration-300"
//                               >
//                                 <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//                                 <rect width="4" height="12" x="2" y="9" />
//                                 <circle cx="4" cy="4" r="2" />
//                               </svg>
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     </CardItem>
//                   </CardBody>
//                 </motion.div>
//               </CardContainer>
//             ))}
//           </div>
//         </div>
//       </BlurFade>
//     </section>
//   );
// };

// export default DeveloperInfo;



export function DeveloperInfo() {
  const testimonials = [
    {
      quote: "Everyone is slave to something.",
      name: "Arav Saxena",
      designation: "Lead Developer",
      src: "/arav.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Shrey Raj",
      designation: "UI/UX Designer",
      src: "/shreyy.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Riddhima Deshmukh",
      designation: "Python Developer",
      src: "/rid.jpg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Devank Upadhaya",
      designation: "Software Developer",
      src: "/dev.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Nandini Patawri",
      designation: "GenAI",
      src: "/nand.jpg",
    },
  ];
  return <div className="bg-gradient-to-r from-purple-50 to-blue-50">
    <h1 className=" py-20 mt-3 text-4xl text-center max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans"><GradientText>Meet Our Team</GradientText></h1>
    <AnimatedTestimonials testimonials={testimonials} />;
  </div>;
}

export default DeveloperInfo;
