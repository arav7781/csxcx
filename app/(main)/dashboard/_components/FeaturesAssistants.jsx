"use client"

import { Button } from "@/components/ui/button"
import { ExpertsList } from "@/services/Options"
import { useUser } from "@stackframe/stack"
import Image from "next/image"
import { BlurFade } from "@/components/magicui/blur-fade"
import UserInputDialog from "./UserInputDialog"
import GradientText from "@/components/ui/GradientText"
import ProfileDialog from "./Profile"
import Link from "next/link"
import { User, Bell } from "lucide-react"
import Threads from "@/components/ui/wave"

export function FeaturesAssistants() {
  const user = useUser()

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="font-medium text-gray-500">My Workspace</h2>
          <h2 className="text-gray-600 text-3xl">
            Hello,{" "}
            <GradientText as="span" className="inline">
              {user?.displayName || "User"}
            </GradientText>
          </h2>
        </div>

        {/* Enhanced Profile Button */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-2 border-blue-200 hover:border-blue-400 transition-all shadow-sm"
          >
            <Bell className="h-5 w-5 text-blue-500" />
          </Button>

          <ProfileDialog>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all rounded-full pl-3 pr-4 py-6 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium text-base">
              <div className="bg-white/30 rounded-full p-1">
                <User className="h-5 w-5" />
              </div>
              Profile
            </Button>
          </ProfileDialog>
        </div>
      </div>

      {/* Grid container with expert options and ArogyaBot included */}
      
      <div className="w-full flex justify-center mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          
          {/* ExpertsList mapped items */}
          {ExpertsList.map((option, index) => (
            <BlurFade key={index} delay={0.25 + index * 0.05} inView>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-lg transition-all flex flex-col justify-center items-center w-full max-w-[200px] bg-gradient-to-r from-purple-50 to-blue-50">
                <UserInputDialog CoachingOption={option}>
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      src={option.icon || "/placeholder.svg"}
                      alt={option.name}
                      width={100}
                      height={100}
                      className="hover:rotate-12 cursor-pointer transition-all"
                    />
                    <p className="text-black text-center mt-2 text-base">{option.name}</p>
                  </div>
                </UserInputDialog>
              </div>
            </BlurFade>
          ))}

          {/* ArogyaBot card */}
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-lg transition-all flex flex-col justify-center items-center w-full max-w-[200px] bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/f2881fdf-d2ac-41a3-8c0a-7e9c30219a74.png"
                alt="BlueBot"
                width={90}
                height={90}
                className="hover:rotate-12 cursor-pointer transition-all"
              />
              <Button
                className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 hover:opacity-90 transition-opacity rounded-md mt-4 w-full text-white text-sm shadow-md"
                asChild
              >
                <Link href="/chatbot" className="w-full text-center">
                  BlueBot
                </Link>
              </Button>
            </div>
          </div>

          {/* Coming Soon card */}
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-lg transition-all flex flex-col justify-center items-center w-full max-w-[200px] bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex flex-col justify-center items-center text-gray-500">
              <Image
                src="/call.png"
                alt="VideoCall"
                width={90}
                height={90}
                className="hover:rotate-12 cursor-pointer transition-all"
              />
              <Button
                className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 hover:opacity-90 transition-opacity rounded-md mt-4 w-full text-white text-sm shadow-md"
                asChild
              >
                <Link href="/visualisation" className="w-full text-center">
                  Sales Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FeaturesAssistants
