import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      this.logger.error('❌ Missing RESEND_API_KEY env var');
    } else {
      this.logger.log('✅ Resend email service ready');
    }

    this.resend = new Resend(apiKey);
  }

  async sendMessage(name: string, email: string, message: string) {
    const adminEmail = process.env.EMAIL_USER || 'joshivarun266@gmail.com';

    try {
      // Notify admin
      await this.resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        replyTo: email,
        to: adminEmail,
        subject: `New Message from ${name}`,
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
      });
      this.logger.log(`📧 Admin notification sent to ${adminEmail}`);

      // Auto-reply to sender
      await this.resend.emails.send({
        from: 'Varun Joshi <onboarding@resend.dev>',
        to: email,
        subject: `Got your message — I'll be in touch!`,
        html: `
          <div style="font-family:monospace;padding:24px;background:#0a0a0a;color:#e0e0e0;border-left:3px solid #c9a96e;">
            <h2 style="color:#c9a96e;margin-top:0;">Hey ${name},</h2>
            <p style="color:#a0a0a0">Thanks for reaching out! I've received your message and will get back to you as soon as possible.</p>
            <hr style="border-color:#333;margin:16px 0;"/>
            <p style="color:#555;font-size:12px">— Varun Joshi · varunjoshi84</p>
          </div>
        `,
      });
      this.logger.log(`📧 Auto-reply sent to ${email}`);

    } catch (error) {
      this.logger.error('❌ Resend error:', error.message);
      throw new InternalServerErrorException('Failed to send contact emails.');
    }
  }
}