import { Injectable } from '@nestjs/common';
import { IPasswordEncryptionService } from '@user/domain/services/password-encryption.service';
import { PasswordVO } from '@user/domain/value-objects/password.vo';
import * as crypto from 'crypto';

@Injectable()
export class CryptoPasswordEncryptionService implements IPasswordEncryptionService {
  private readonly saltRounds = 1000;
  private readonly keyLength = 64;
  private readonly digest = 'sha512';

  hashPassword(passwordVO: PasswordVO): { hashedPassword: string; salt: string } {
    const salt = this.generateSalt();
    const hashedPassword = crypto
      .pbkdf2Sync(passwordVO.getValue(), salt, this.saltRounds, this.keyLength, this.digest)
      .toString('hex');

    return {
      hashedPassword,
      salt,
    };
  }

  private generateSalt(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
