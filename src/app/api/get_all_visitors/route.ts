import { HttpStatusCode } from "@/utils/enums";
import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function GET() {
  try {
    const response = await fetch(`https://my.api.mockaroo.com/visitors.json`, {
      method: "GET",
      headers: { "X-API-Key": "cc3e9c00" },
      cache: "no-store",
    });

    if (response.status === 200) {
    // Get the response text since it's CSV, not JSON
    const csvText = await response.text();
  
    // Use PapaParse to parse the CSV data into a JSON-like structure
    const parsedData = Papa.parse(csvText, {
      header: true, 
      skipEmptyLines: true,
    });

    // Return the parsed data as JSON
    return NextResponse.json(parsedData.data, { status: HttpStatusCode.OK });

  } else {
  return NextResponse.json(
    { error: true, message: "Fail to fetch Customer" },
    { status: HttpStatusCode.BAD_REQUEST }
  )
}

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: true, message: "An error occurred. Please try again." },
      { status: HttpStatusCode.INTERNAL_SERVER }
    );
  }
}
