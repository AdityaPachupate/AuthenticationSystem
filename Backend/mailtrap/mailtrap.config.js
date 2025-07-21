import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();


export const mailtrapClient = new MailtrapClient({
  endpoint:process.env.MAILTRAP_ENDPOINT ,
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Aditya",    
};

// const recipients = [
//   {
//     email: "themeworld00@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);