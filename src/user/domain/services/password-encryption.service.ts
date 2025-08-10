import { PasswordVO } from '@user/domain/value-objects/password.vo';

export interface IPasswordEncryptionService {
  hashPassword(passwordVO: PasswordVO): { hashedPassword: string; salt: string };
}
