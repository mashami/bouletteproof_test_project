import { CustomerType, registerType, VisitorsType } from "@/utils/types"

export const getAllVisitors = async (): Promise<VisitorsType[]> => {
  const response = await fetch(process.env.APP_URL + `/api/get_all_visitors`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  })

  if (!response.ok) {
    throw new Error("Failed to fetch visitors")
  }

  const result: VisitorsType[] = await response.json()

  return result
}

export const getAllCustomers = async (): Promise<CustomerType[]> => {
  const response = await fetch(process.env.APP_URL + `/api/get_all_customers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store"
  })

  if (!response.ok) {
    throw new Error("Failed to fetch Customers")
  }

  const result: CustomerType[] = await response.json()

  return result
}

export const register = async ({
  customer_name,
  email,
  password,
  retypedPassword
}: registerType) => {
  const response = await fetch(`/api/register_customer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_name, email, password, retypedPassword }),
    cache: "no-store"
  })

  const result: CustomerType = await response.json()

  return result
}
