const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// extract email safely
function extractEmail(text = "") {
    const match = text.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/
    );
    return match ? match[0] : null;
}

// email template
function createEmail() {
    return `
Hi,

I hope you're doing well.

I am applying for the Java Developer Contract role.
I have strong experience in Java, Spring Boot, and backend development.

Please find my resume attached.

Looking forward to your response.

Regards,
Candidate
`;
}

// gmail sender
async function sendMail(toEmail, subject, text) {

    console.log("Preparing to send email to:", toEmail);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    // verify connection 
    await transporter.verify();

    const mailOptions = {
        from: process.env.EMAIL,
        to: toEmail,
        subject,
        text,
        attachments: [
            {
                filename: "resume.pdf",
                path: "./resume.pdf"
            }
        ]
    };

    return transporter.sendMail(mailOptions);
}

// MAIN API
app.post("/apply", async (req, res) => {
    try {

        console.log("HEADERS:", req.headers["content-type"]);
        console.log("BODY RECEIVED:", req.body);

        const jobText = req.body?.jobText;

        if (!jobText) {
            return res.status(400).send("jobText missing in request body");
        }

        console.log("Received jobText:", jobText);

        // extract email
        const email = extractEmail(jobText);

        if (!email) {
            return res.status(400).send("No recruiter email found in jobText");
        }

        console.log("Extracted email:", email);

        // create message
        const message = createEmail();

        //send email
        await sendMail(
            email,
            "Job Application - Java Developer",
            message
        );

        console.log("Email sent successfully");

        res.send({
            status: "success",
            message: "Email sent successfully",
            to: email
        });

    } catch (err) {
        console.log("ERROR:", err.message);
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
});

// start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});