import dates from "../dates.json";
import { NextResponse } from "next/server";
import fs from 'fs/promises'; // Import the fs/promises module
import path from 'path';

export async function POST(request){
    try{
        const reqData = await request.json();
        const { date, type } = reqData;

        //if date is present - edit the json data dates array
        const existingDate = dates.data.findIndex(d => d.date === date);

        console.log(date, type, existingDate);

        let message = "inserted";

        if(existingDate > -1){
            if(type === "mobile"){
                dates.data[existingDate].mobile += 1;
            }else{
                dates.data[existingDate].desktop += 1;
            }

            message = "updated"

        }else{
            dates.data.push({
                date,
                mobile: type === "mobile" ? 1 : 0,
                desktop: type === "desktop" ? 1 : 0
            });
        }
        // Construct the absolute path to dates.json
        const filePath = path.join(process.cwd(), 'src/app/api/Visitors/dates.json');

        // Write the updated dates array back to dates.json
        await fs.writeFile(filePath, JSON.stringify(dates, null, 2)); // Use fs.promises.writeFile

        return NextResponse.json(
            { message },
            { status: 200 }
        );

    }catch(error){
        console.error("Error inserting data:", error);
        return NextResponse.json(
            { error: "Failed to insert data" },
            { status: 500 }
        );
    }
}