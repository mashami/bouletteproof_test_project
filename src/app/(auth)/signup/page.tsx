/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { register } from "@/app/services/services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
const signupPage = () => {
  const [customer_name, setCustomer_name] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [retypedPassword, setRetypedPassword] = useState<string>("")

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("Heeellllll")

    if (!customer_name || !email || !password || !retypedPassword) {
      return toast({
        variant: "destructive",
        description: "All fields are required"
      })
    }
    if (password !== retypedPassword) {
      return toast({
        variant: "destructive",
        description: "password are not match"
      })
    }

    setIsLoading(true)

    try {
      const result = await register({
        email,
        password,
        customer_name,
        retypedPassword
      })
      if (!result) {
        toast({
          variant: "destructive",
          description: "Fail to registra"
        })
        setIsLoading(false)

        return
      }

      const resultemail = result.email
      const resultPassword = result.password

      const resultSign = await signIn("credentials", {
        resultemail,
        resultPassword,
        redirect: false
      })

      if (resultSign?.error) {
        toast({
          variant: "destructive",
          description: resultSign.error
        })
        setIsLoading(false)

        return
      }

      return router.push("/details")
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occured. Please try again."
      })
      setIsLoading(false)
      return
    }
  }

  return (
    <div className="">
      <div className="w-[550px] px-[115px] pt-[63px] pb-[40px] mx-auto bg-white rounded-[16px] space-y-6">
        <div className="space-y-5 text-center">
          <h1
            className="font-bricolage font-bold text-[36px] text-[#006A86] cursor-pointer"
            onClick={() => router.push("/")}
          >
            VisitorVue
          </h1>
          <p className="font-medium text-[20px] text-black font-bricolage">
            Sign Up on VisitorVue
          </p>
        </div>

        <form
          action="submit"
          onSubmit={onSubmitHandler}
          className="flex flex-col space-y-6"
        >
          <span className="space-y-[6px]">
            <label
              htmlFor=""
              className="text-[14px] leading-5 font-normal text-black"
            >
              Full name
            </label>
            <Input
              type="text"
              className="border border-[#Fee] p-2 rounded-md"
              value={customer_name}
              onChange={(e) => setCustomer_name(e.target.value)}
            />
          </span>

          <span className="space-y-[6px]">
            <label
              htmlFor=""
              className="text-[14px] leading-5 font-normal text-black"
            >
              Email
            </label>
            <Input
              type="email"
              className="border border-[#Fee] p-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>

          <span className="space-y-[6px]">
            <label
              htmlFor=""
              className="text-[14px] leading-5 font-normal text-black"
            >
              Password
            </label>
            <Input
              type="text"
              className="border border-[rgb(255,238,238)] p-2 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>

          <span className="space-y-[6px]">
            <label
              htmlFor=""
              className="text-[14px] leading-5 font-normal text-black"
            >
              Re-type Password
            </label>

            <Input
              type="text"
              className="border border-[#Fee] p-2 rounded-md"
              value={retypedPassword}
              onChange={(e) => setRetypedPassword(e.target.value)}
            />
          </span>
          <Button
            className="text-white w-full py-5"
            text="Continue"
            style={{
              boxShadow: " 0px 4px 4px 0px rgba(217, 217, 217, 0.25) inset"
            }}
            onClick={() => onSubmitHandler}
            loading={isLoading}
            disabled={isLoading}
          />
        </form>

        <span className="text-[14px] leading-5 font-normal flex items-center space-x-1 justify-center">
          <p className="text-black">Already have an account?</p>
          <a href="/signin" className="text-[#006A86]">
            Sign in
          </a>
        </span>
      </div>
    </div>
  )
}

export default signupPage
