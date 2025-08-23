import { ITokenService } from '@/auth/domain/services/token.service';
import { LoginInput } from '@/auth/presentation/dto/login.input';
import { CustomBadRequestException, CustomNotFoundException } from '@/common/exceptions';
import { UserService } from '@/user/application/services/user.service';
import { IPasswordEncryptionService } from '@/user/domain/services/password-encryption.service';
import { PasswordVO } from '@/user/domain/value-objects/password.vo';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('IPasswordEncryptionService') private readonly passwordEncryptionService: IPasswordEncryptionService,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
  ) {}

  async login(input: LoginInput): Promise<string> {
    try {
      const user = await this.userService.findUniqueByEmail(input.email);

      const isPasswordValid = user.verifyPassword(new PasswordVO(input.password), this.passwordEncryptionService);

      if (!isPasswordValid) {
        throw new CustomBadRequestException('비밀번호가 일치하지 않습니다');
      }

      return this.tokenService.generateToken(user.getId(), user.getEmail());
    } catch (error) {
      if (error instanceof CustomNotFoundException || error instanceof CustomBadRequestException) {
        throw new CustomBadRequestException('유저 정보가 일치하지 않습니다.');
      }

      throw error;
    }
  }
}
