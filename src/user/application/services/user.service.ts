import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDTO } from '@user/application/dtos/create-user.dto';
import { UserEntity } from '@user/domain/entities/user.entity';
import { IUserRepository } from '@user/domain/i-repositories/user.repository.interface';
import { IPasswordEncryptionService } from '@user/domain/services/password-encryption.service';
import { UserDomainService } from '@user/domain/services/user-domain.service';
import { PasswordVO } from '@user/domain/value-objects/password.vo';
import { CustomNotFoundException } from '../../../common/exceptions';

@Injectable()
export class UserService {
  private userDomainService: UserDomainService;

  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IPasswordEncryptionService') private readonly passwordEncryptionService: IPasswordEncryptionService,
  ) {
    this.userDomainService = new UserDomainService(this.userRepository);
  }

  async create(data: CreateUserDTO): Promise<UserEntity> {
    await this.userDomainService.checkDuplicatedEmail(data.email);

    const passwordVO = new PasswordVO(data.password);
    const { hashedPassword, salt } = this.passwordEncryptionService.hashPassword(passwordVO);

    const user = UserEntity.create({
      password: hashedPassword,
      email: data.email,
      name: data.name,
      salt,
    });

    return this.userRepository.create(user);
  }

  async findUnique(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findUniqueById(id);
    if (!user) throw new CustomNotFoundException('존재하지 않는 유저입니다');

    return user;
  }
}
