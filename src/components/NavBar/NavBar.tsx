"use client"

import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowRighSvg, List } from "../Svg"
import { Button } from "../ui/button"

const NavBar = () => {
  const [isScroll, setIsScroll] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setCurrentScrollY(currentScrollY)

      if (currentScrollY === 0) {
        setIsScroll(false)
      }

      if (currentScrollY < prevScrollY) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }

      setPrevScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollY, currentScrollY])

  return (
    <nav
      className={cn(
        "absolute top-0 py-6 left-0 md:px-[100px] px-6 bg-[#F3F3F3] backdrop-blur-[14px] transition-all duration-500 ease-in-out -translate-y-full w-full flex items-center justify-between",
        currentScrollY > 0 && "fixed w-full shadow-xl",
        (currentScrollY === 0 || isScroll) && "translate-y-0",
        (path === "/signup" || path === "/signin") && "hidden"
      )}
      style={{ zIndex: "1000" }}
    >
      <h1
        className="font-bricolage font-bold text-[24px] text-[#006A86] cursor-pointer"
        onClick={() => router.push("/")}
      >
        VisitorVue
      </h1>
      <div className="md:flex hidden items-center space-x-4">
        <Button
          text="Sign in"
          className="py-[14px] px-6 bg-white hover:bg-white/80 rounded-[32px]"
          onClick={() => router.push("/signin")}
        />
        <Button
          text="Create account"
          className="py-[14px] px-6 bg-black hover:bg-black/80 rounded-[32px] text-white"
          svg={<ArrowRighSvg />}
          onClick={() => router.push("/signup")}
        />
      </div>
      <div className="md:hidden block">
        <List />
      </div>
    </nav>
  )
}

export default NavBar
