import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { lookup } from 'dns';
import { promisify } from 'util';

const lookupAsync = promisify(lookup);

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter;

  constructor() {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      this.logger.error(`❌ Missing EMAIL_USER or EMAIL_PASS`);
    } else {
      this.logger.log(`✅ SMTP ready for ${user}`);
    }

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,           // STARTTLS on 587
      auth: { user, pass },
      // Force IPv4 — Render free tier blocks outbound IPv6
      family: 4,
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    } as any);
  }

  async sendMessage(name: string, email: string, message: string) {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    const mailToAdmin = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: adminEmail,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:monospace;padding:24px;background:#0a0a0a;color:#e0e0e0;border-left:3px solid #c9a96e;">
          <h2 style="color:#c9a96e;margin-top:0;">New Portfolio Message</h2>
          <p><strong style="color:#c9a96e">Name:</strong> ${name}</p>
          <p><strong style="color:#c9a96e">Email:</strong> <a href="mailto:${email}" style="color:#c9a96e">${email}</a></p>
          <hr style="border-color:#333;margin:16px 0;"/>
          <p><strong style="color:#c9a96e">Message:</strong></p>
          <p style="line-height:1.6;color:#a0a0a0">${message.replace(/\n/g, '<br/>')}</p>
        </div>
      `,
    };

    const autoReply = {
      from: `"Varun Joshi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Got your message — I'll be in touch!`,
      text: `Hi ${name},\n\nThanks for reaching out! I've received your message and will get back to you soon.\n\nBest,\nVarun Joshi`,
      html: `
        <div style="font-family:monospace;padding:24px;background:#0a0a0a;color:#e0e0e0;border-left:3px solid #c9a96e;">
          <h2 style="color:#c9a96e;margin-top:0;">Hey ${name},</h2>
          <p style="color:#a0a0a0">Thanks for reaching out! I've received your message and will get back to you as soon as possible.</p>
          <hr style="border-color:#333;margin:16px 0;"/>
          <p style="color:#555;font-size:12px">— Varun Joshi · varunjoshi84</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailToAdmin);
      this.logger.log(`📧 Admin notification sent to ${adminEmail}`);
      await this.transporter.sendMail(autoReply);
      this.logger.log(`📧 Auto-reply sent to ${email}`);
    } catch (error) {
      this.logger.error('❌ SMTP send error:', error.message);
      throw new InternalServerErrorException('Failed to send contact emails.');
    }
  }
}