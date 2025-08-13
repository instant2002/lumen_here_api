import { CustomBadRequestException } from '@common/exceptions';
import { IUserRepository } from '@user/domain/i-repositories/user.repository.interface';

export class UserDomainService {
  constructor(private readonly userRepository: IUserRepository) {}

  async checkDuplicatedEmail(email: string) {
    const existingUser = await this.userRepository.findUniqueByEmail(email);
    if (existingUser) throw new CustomBadRequestException('이미 사용중인 이메일입니다');
  }
}
