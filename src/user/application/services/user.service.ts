import { Inject, Injectable } from '@nestjs/common';

import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/i-repositories/user.repository.interface';
import { IPasswordEncryptionService } from '../../domain/services/password-encryption.service';
import { IUserDomainService } from '../../domain/services/user-domain.service';
import { PasswordVO } from '../../domain/value-objects/password.vo';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IPasswordEncryptionService') private readonly passwordEncryptionService: IPasswordEncryptionService,
    @Inject('IUserDomainService') private readonly userDomainService: IUserDomainService,
  ) {}

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

  async findUnique(id: number): Promise<UserEntity | null> {
    return this.userRepository.findUniqueById(id);
  }
}
