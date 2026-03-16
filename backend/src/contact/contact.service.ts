import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendMessage(name: string, email: string, message: string) {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    // 1. Email notification to Admin/Owner
    const mailToAdmin = {
      from: `"${name}" <${email}>`,
      to: adminEmail,
      subject: `New Portfolio Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // 2. Auto-reply to User
    const autoReplyToUser = {
      from: `"Varun Joshi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for reaching out!`,
      text: `Hi ${name},\n\nThanks for getting in touch! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nVarun Joshi\n\n--- Your Message ---\n${message}`,
    };

    // Send both asynchronously
    await Promise.all([
      this.transporter.sendMail(mailToAdmin),
      this.transporter.sendMail(autoReplyToUser),
    ]);
  }
}
