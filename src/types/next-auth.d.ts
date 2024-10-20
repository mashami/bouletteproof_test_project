import "next-auth"
import type { DefaultSession } from "next-auth"
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string
      customer_name: string
      signup_date: string
      last_activity: string
    }
  }
  interface User extends DefaultUser {
    signup_date: string
    last_activity: string
  }
}
