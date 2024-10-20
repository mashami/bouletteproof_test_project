import { HttpStatusCode } from "@/utils/enums"
import { NextResponse } from "next/server"
import Papa from "papaparse"

// Helper function to format the date as MM/DD/YYYY
const formatDate = (date: Date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0") // Months are 0-based
  const day = date.getDate().toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export async function POST(req: Request) {
  const { id, customer_name, email, password, retypedPassword } =
    await req.json()

  // Check for missing fields
  if (!id || !customer_name || !email || !password || !retypedPassword) {
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
