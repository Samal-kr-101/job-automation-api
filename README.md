🚀 Job Application Automation API
📌 Overview

This project is a backend automation system that extracts recruiter email addresses from job descriptions and automatically sends job application emails with resume attachment.

It is built to reduce manual job application effort by automating the email sending process using Node.js and Gmail SMTP.

⚙️ Features
🔍 Extracts email from job description using regex
📩 Automatically sends email to recruiter
📎 Attaches resume automatically
🤖 Fully automated backend workflow
🔐 Uses Gmail SMTP for secure email delivery
🧠 How It Works

User sends job description to API
System extracts recruiter email
System generates application email
Gmail SMTP sends email automatically
Resume is attached in email
🚀 API Endpoint

POST /apply
Request Body:
{
  "jobText": "Hiring Java Developer. Contact hr@gmail.com"
}
Response:
{
  "status": "success",
  "message": "Email sent successfully",
  "to": "hr@gmail.com"
}
🛠️ Tech Stack

Node.js
Express.js
Nodemailer
Gmail SMTP
Regex for email extraction

🔐 Environment Variables

Create .env file:

EMAIL=yourgmail@gmail.com
PASSWORD=your_app_password

📂 Project Structure
job-automation-api/
│── server.js
│── mailer.js
│── resume.pdf
│── .env
│── README.md

📌 How to Run
npm install
node server.js

Server runs on:

http://localhost:5000

🎯 Use Case
Automates job applications
Extracts recruiter contacts from job posts
Sends instant application emails
Saves manual effort in job searching
👨‍💻 Author

Samal-kr-101