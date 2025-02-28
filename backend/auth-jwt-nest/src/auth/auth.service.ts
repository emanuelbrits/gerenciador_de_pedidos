import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await this.prisma.user.create({
        data: { email, password: hashedPassword, name: 'Default Name' },
      });
      return user;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new InternalServerErrorException('Erro ao registrar usuário');
    }
  }
}
