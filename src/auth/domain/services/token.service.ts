export interface ITokenService {
  generateToken(userId: number, userEmail: string): string;
}
