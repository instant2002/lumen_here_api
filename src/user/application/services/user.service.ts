import { Inject, Injectable } from '@nestjs/common';

import { IdGeneratorUtil } from '../../../shared/infrastructure/utils/id-generator.util';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { EmailValueObject } from '../../domain/value-objects/email.vo';
import { PasswordValueObject } from '../../domain/value-objects/password.vo';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly userDomainService: UserDomainService,
  ) {}

  async createUser(email: string, password: string, name: string): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const passwordVO = new PasswordValueObject(password);
    const emailVO = new EmailValueObject(email);

    const user = UserEntity.create({ id: IdGeneratorUtil.getRandomUUID(), email: emailVO, password: passwordVO, name });

    return this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findByEmail(email);
  }

  async updateUserPassword(id: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updatePassword = new PasswordValueObject(password);
    user.updatePassword(updatePassword);
    return await this.userRepository.update(user);
  }
}
