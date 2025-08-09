import { PasswordVO } from '../value-objects/password.vo';

export interface IPasswordEncryptionService {
  hashPassword(passwordVO: PasswordVO): { hashedPassword: string; salt: string };
}
