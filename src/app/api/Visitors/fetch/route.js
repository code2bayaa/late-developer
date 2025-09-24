import {NextResponse} from "next/server"
import data from "../dates.json";

export async function GET(){
  try {
    // Optionally process the data here before sending it
    console.log("fetching dates...")
    return NextResponse.json(data,{status:200}); // Send the JSON data as a response
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    ); // Send an error response
  }
}