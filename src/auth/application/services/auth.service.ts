import { ITokenService } from '@/auth/domain/services/token.service';
import { LoginInput } from '@/auth/presentation/dto/login.input';
import { CustomBadRequestException, CustomNotFoundException } from '@/common/exceptions';
import { UserService } from '@/user/application/services/user.service';
import { IPasswordEncryptionService } from '@/user/domain/services/password-encryption.service';
import { PasswordVO } from '@/user/domain/value-objects/password.vo';
import { Inject } from '@nestjs/common';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('IPasswordEncryptionService') private readonly passwordEncryptionService: IPasswordEncryptionService,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
  ) {}

  async login(input: LoginInput): Promise<string> {
    try {
      const user = await this.userService.findUniqueByEmail(input.email);

      const isPasswordValid = this.passwordEncryptionService.verifyPassword({
        passwordVO: new PasswordVO(input.password),
        hashedPassword: user.password,
        salt: user.salt,
      });

      if (!isPasswordValid) {
        throw new CustomNotFoundException('비밀번호가 일치하지 않습니다');
      }

      return this.tokenService.generateToken(user.id, user.email);
    } catch (error) {
      if (error instanceof CustomNotFoundException) {
        throw new CustomBadRequestException('유저 정보가 일치하지 않습니다.');
      }

      throw error;
    }
  }
}
