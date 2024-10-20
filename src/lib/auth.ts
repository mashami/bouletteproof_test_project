/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCustomers } from "@/app/services/services"
import { CustomerType } from "@/utils/types"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// type Awaitable<T> = T | Promise<T>

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",

      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        if (!email || !password) {
          throw new Error("All fields are required")
        }
        try {
          const customers: CustomerType[] = await getAllCustomers()

          // const customer: CustomerType | undefined = customers.find(
          //   (u) => u.email === email
          // )

          // const isValidPassword = await compare(password, customer.password!)

          // if (!isValidPassword) {
          //   return null
          // }

          const randomIndex = Math.floor(Math.random() * customers.length)
          const customer: CustomerType = customers[randomIndex]

          if (!customer) {
            throw new Error("User is not Exit")
          }

          const { password: _, ...restCustomer } = customer // Return customer infomation without password

          return {
            id: customer.id,
            customer_name: customer.customer_name,
            email: customer.email,
            signup_date: customer.signup_date,
            last_activity: customer.last_activity
          } as CustomerType | any
        } catch (error) {
          throw new Error("An error occurred. Please try again.")
        }
      }
    })
  ],

  pages: {
    signIn: "/signin"
  },

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },

  callbacks: {
    async session({ session, token }) {
      // Destructure user from the session callback
      const { user: sessionUser, ...rest } = session
      const t = token as unknown as any

      const mergedUser = {
        ...sessionUser,
        id: t.id,
        email: t.email,
        customer_name: t.name,
        signup_date: t.signup_date,
        last_activity: t.last_activity
      }

      return {
        ...rest,
        user: mergedUser
      }
    },

    async jwt({ token, user }) {
      // console.log("User ---->", { user })

      if (user) {
        return {
          ...token,
          id: user.id,
          customer_name: user.name,
          email: user.email,
          signup_date: user.signup_date,
          last_activity: user.last_activity
        }
      }

      return token
    }
  },

  secret: process.env.NEXTAUTH_SECRET
}
