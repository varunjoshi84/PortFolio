import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async sendContactMessage(
    @Body() body: { name: string; email: string; message: string },
  ) {
    if (!body.name || !body.email || !body.message) {
      throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.contactService.sendMessage(body.name, body.email, body.message);
      return { success: true, message: 'Message sent successfully' };
    } catch (error) {
      console.error('Contact submission error:', error);
      throw new HttpException('Failed to send message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
