import { ITokenService } from '@/auth/domain/services/token.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(userId: number, userEmail: string): string {
    return this.jwtService.sign({ userId, userEmail });
  }
}
