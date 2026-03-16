import { Controller, Post, Body, HttpException, HttpStatus, Get, UseGuards, Patch, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
      throw new HttpException(
        'Failed to send message',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllContacts() {
    try {
      return await this.contactService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch messages', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    try {
      const updated = await this.contactService.markAsRead(id);
      if (!updated) {
        throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
      }
      return updated;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed to update message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}