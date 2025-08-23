import { PasswordVO } from '@user/domain/value-objects/password.vo';

export interface IPasswordEncryptionService {
  hashPassword(plainPassword: PasswordVO, salt?: string): { hashedPassword: string; salt: string };
}
