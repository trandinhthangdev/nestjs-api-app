import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
@Injectable({})
export class AuthService {
  constructor(
    private prismaServe: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  doSomething() {
    console.log('hello bro');
  }
  async register(authDTO: AuthDTO) {
    try {
      const hashedPassword = await argon.hash(authDTO.password);

      const user = await this.prismaServe.user.create({
        data: {
          email: authDTO.email,
          hashedPassword: hashedPassword,
          firstName: '',
          lastName: '',
        },
        // only select id, email, createdAt
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      // you shoulda add constraint "unique" to user table
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(error.message);
      }
      return {
        error: error,
      };
    }
  }
  async login(authDTO: AuthDTO) {
    // find user with input email
    const user = await this.prismaServe.user.findFirst({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const passwordMatched = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );
    if (!passwordMatched) {
      throw new ForbiddenException('Incorrect password');
    }
    delete user.hashedPassword;
    return await this.convertToJwtString(user.id, user.email);

    return {
      message: 'this is login',
    };
  }
  async convertToJwtString(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email: email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }
}
