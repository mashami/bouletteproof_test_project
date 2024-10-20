/* eslint-disable react/no-unescaped-entities */
"use client"
import { HomePageDescription } from "@/components/HomePageDescription"
import {
  AlarmSvg,
  AlarmUserSvg,
  ArrowRighSvg,
  ClockUserSvg
} from "@/components/Svg"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface HomePageWidgetProps {
  totalVisitors: string
  avarageDuration: string
  bounceRate: string
}

export default function HomePageWidget({
  avarageDuration,
  bounceRate,
  totalVisitors
}: HomePageWidgetProps) {
  const router = useRouter()
  return (
    <main className="w-full h-full  md:pb-[168px] pb-12 bg-[#F3F3F3] relative">
      <div className="md:max-w-[1059px] w-full mx-auto pt-[71px] text-center space-y-[74px]">
        <div className=" px-4 relative">
          <h1 className="lg:text-[64px] md:text-[44px] text-[30px] text-black font-bold leading-[71px] font-bricolage pt-[10px] pb-5">
            Welcome to VisitorVue
          </h1>
          <p className="md:text-[20px] text-[16px] max-w-[600px] mx-auto font-light leading-[30px] text-black pb-[44px]">
            VisitorVue offers real-time insights to help you track and analyze
            key metrics such as page views, unique visitors, bounce rates, and
            customer engagement. Designed to support both customer relationship
            management and website performance monitoring, VisitorVue provides
            the tools needed for data-driven decisions. With actionable
            insights, you can better understand audience behavior and enhance
            their experience.
          </p>
          <Button
            text="Create account"
            className="py-[14px] px-6 bg-black hover:bg-black/80 rounded-[32px] text-white"
            svg={<ArrowRighSvg />}
            onClick={() => router.push("/signup")}
          />

          <motion.svg
            width={69}
            height={98}
            viewBox="0 0 69 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-2 md:left-40 left-1 "
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.25,
                ease: "easeInOut"
              }}
              d="M46.03 2C42.53 3.16667 35.63 9.7 36.03 26.5C36.53 47.5 44.03 50.5 46.53 50.5C49.03 50.5 54.03 43.5 34.03 30C14.03 16.5 -1 26.5 2.02998 42C5.00986 57.2437 25.03 82 66.53 88.5M66.53 88.5L59.0302 76.5M66.53 88.5L52.5302 96.5"
              stroke="#006A86"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </motion.svg>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 gap-9 relative">
          <motion.div
            initial={{ x: "222%" }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <HomePageDescription
              svg={<AlarmSvg />}
              header="Total visitors"
              description="Total visitors refers to the total number of individuals who visit a website within a specified period. "
              number={totalVisitors}
            />
          </motion.div>

          <motion.div
            initial={{ x: "111%" }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <HomePageDescription
              svg={<ClockUserSvg />}
              header="Bounce Rate"
              description="The bounce rate is the percentage of visitors who leave a website after viewing only a single page, without interacting further."
              number={bounceRate}
            />
          </motion.div>
          <motion.div
            initial={{ x: "1%" }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <HomePageDescription
              svg={<AlarmUserSvg />}
              header="Average Session Duration"
              description="Average session duration refers to the average amount of time visitors spend on a website during a single visit."
              number={avarageDuration}
            />
          </motion.div>
        </div>
      </div>

      <motion.svg
        width={577}
        height={333}
        viewBox="0 0 577 333"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-10 xl:-left-[100px] md:-bottom-14 md:block hidden"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.25,
            ease: "easeInOut"
          }}
          d="M0 3C100.339 90.0591 278.294 275.392 187.398 320.249C73.7789 376.321 -94.437 160.887 574 225.812"
          stroke="url(#paint0_linear_141_4588)"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_141_4588"
            x1={287}
            y1="132.5"
            x2={287}
            y2="329.665"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8E38FF" />
            <stop offset={1} stopColor="#992B87" />
          </linearGradient>
        </defs>
      </motion.svg>
    </main>
  )
}
