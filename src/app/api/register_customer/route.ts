import { HttpStatusCode } from "@/utils/enums"
import { formatDate, getRandomInt } from "@/utils/helper"
import { NextResponse } from "next/server"
import Papa from "papaparse"

export async function POST(req: Request) {
  const { customer_name, email, password, retypedPassword } = await req.json()

  console.log(customer_name, email, password, retypedPassword)

  // Check for missing fields
  if (!customer_name || !email || !password || !retypedPassword) {
    return NextResponse.json(
      { error: true, message: "All fields are required" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  // Check if passwords match
  if (password !== retypedPassword) {
    return NextResponse.json(
      { error: true, message: "Passwords do not match" },
      { status: HttpStatusCode.BAD_REQUEST }
    )
  }

  // Generate the current date for signup_date and last_activity
  const currentDate = formatDate(new Date())
  const id = getRandomInt(1, 100) //Generate random number

  try {
    const apiUrl = `https://my.api.mockaroo.com/customers.json?id=${id}&customer_name=${encodeURIComponent(
      customer_name
    )}&email=${encodeURIComponent(
      email
    )}&signup_date=${currentDate}&last_activity=${currentDate}`

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "X-API-Key": "cc3e9c00" },
      cache: "no-store"
    })

    if (response.status === 200) {
      // Get the response text since it's CSV, not JSON
      const csvText = await response.text()

      // Parse the CSV data into a JSON-like structure using PapaParse
      const parsedData = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true
      })

      // Return the parsed data as JSON
      return NextResponse.json(parsedData.data, { status: HttpStatusCode.OK })
    } else {
      return NextResponse.json(
        { error: true, message: "Failed to fetch customer data" },
        { status: HttpStatusCode.BAD_REQUEST }
      )
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json(
      { error: true, message: "An error occurred. Please try again." },
      { status: HttpStatusCode.INTERNAL_SERVER }
    )
  }
}
