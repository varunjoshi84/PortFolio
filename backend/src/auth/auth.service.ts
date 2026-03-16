import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService
  ) {}

  async validateAdmin(email: string, pass: string): Promise<any> {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (adminEmail && adminPass && email === adminEmail && pass === adminPass) {
      return { email: adminEmail, _id: 'admin-hardcoded-id' };
    }
    
    // Fallback to database check
    const admin = await this.adminModel.findOne({ email }).exec();
    if (admin && await bcrypt.compare(pass, admin.password)) {
      const { password, ...result } = admin.toObject();
      return result;
    }
    return null;
  }

  async login(admin: any) {
    const payload = { email: admin.email, sub: admin._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Helper method for initial setup or admin creation
  async register(adminDto: any) {
    const existing = await this.adminModel.findOne({ email: adminDto.email });
    if (existing) {
      throw new ConflictException('Admin already exists');
    }
    const hashedPassword = await bcrypt.hash(adminDto.password, 10);
    const createdAdmin = new this.adminModel({
      ...adminDto,
      password: hashedPassword,
    });
    return createdAdmin.save();
  }
}
