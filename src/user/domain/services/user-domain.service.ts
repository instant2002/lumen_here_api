import { IUserRepository } from '../i-repositories/user.repository.interface';

export interface IUserDomainService {
  checkDuplicatedEmail(email: string);
}

export class UserDomainService implements IUserDomainService {
  constructor(private readonly userRepository: IUserRepository) {}

  async checkDuplicatedEmail(email: string) {
    const existingUser = await this.userRepository.findUniqueByEmail(email);
    if (existingUser) {
      throw new Error('이미 존재하는 이메일입니다');
    }
  }
}
