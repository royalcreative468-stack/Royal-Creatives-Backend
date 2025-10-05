import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, phone, company, service, message } = req.body;

    try {
        // Setup Nodemailer transport
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Gmail App Password
            },
        });

        // Email content
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.RECEIVER_EMAIL, // your inbox
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Request</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone || "N/A"}</p>
                <p><b>Company:</b> ${company || "N/A"}</p>
                <p><b>Service Interested:</b> ${service || "N/A"}</p>
                <p><b>Message:</b> ${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "✅ Email sent successfully!" });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ success: false, message: "❌ Failed to send email" });
    }
});

export default router;
