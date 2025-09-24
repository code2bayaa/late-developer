import nodemailer from "nodemailer"
import {NextResponse} from "next/server"
import emails from "./emails.json"
import fs from 'fs/promises'; // Import the fs/promises module
import path from 'path';

export async function POST(request){
    try{
        const { name, email, subject, message } = await request.json()


        if(!name || !email || !subject || !message){
            return NextResponse.json({ error : "Please fill all the fields" }, { status : 400 })  
        }

        //insert user to db
        const existingUser = emails.data.findIndex(d => d.email === email);

        if(existingUser > -1){
            emails.data[existingUser].visit += 1;
        }else{
            emails.data.push({ name, email, visit: 1, date: new Date().toISOString().split('T')[0] });
        }

        // Construct the absolute path to emails.json
        const filePath = path.join(process.cwd(), 'src/app/api/Email/emails.json');

        // Write the updated dates array back to dates.json
        await fs.writeFile(filePath, JSON.stringify(emails, null, 2)); // Use fs.promises.writeFile

        //send email
        const transporter = nodemailer.createTransport({
            host : process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port : process.env.SMTP_PORT,
            secure : false,
            auth : {
                user : process.env.SMTP_USER,
                pass : process.env.SMTP_PASS
            }
        })
        const sent = await transporter.sendMail({
            from : "portfolio " + process.env.SMTP_USER,
            to : process.env.SMTP_RECEIVER,
            subject : subject,
            html : `name | ${name} | email${message}`
        })

        if(sent.rejected.length > 0){
            return NextResponse.json({ error : "Message not sent" }, { status : 500 })
        }

        return NextResponse.json({ status : true }, { status : 200 })
    }catch(error){
        return NextResponse.json({ error : error.message }, { status : 500 })
    }
}