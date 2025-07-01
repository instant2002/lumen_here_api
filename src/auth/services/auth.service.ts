import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../user/application/services/user.service';
import { UserEntity } from '../../user/domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ token: string; user: UserEntity }> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.userService.validatePassword(user, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { token, user };
  }

  private generateToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
