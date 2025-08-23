import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDTO } from '@user/application/dtos/create-user.dto';
import { UserEntity } from '@user/domain/entities/user.entity';
import { DuplicateEmailException, UserNotFoundException } from '@user/domain/exceptions/user-domain.exception';
import { IUserRepository } from '@user/domain/i-repositories/user.repository.interface';
import { IPasswordEncryptionService } from '@user/domain/services/password-encryption.service';
import { PasswordVO } from '@user/domain/value-objects/password.vo';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IPasswordEncryptionService') private readonly passwordEncryptionService: IPasswordEncryptionService,
  ) {}

  async create(data: CreateUserDTO): Promise<UserEntity> {
    // 중복 이메일 체크는 Application Service에서 처리
    const existingUser = await this.userRepository.findUniqueByEmail(data.email);
    if (existingUser) {
      throw new DuplicateEmailException('이미 사용중인 이메일입니다');
    }

    const plainPassword = new PasswordVO(data.password);

    const user = UserEntity.create({
      email: data.email,
      plainPassword,
      name: data.name,
      encryptionService: this.passwordEncryptionService,
    });

    return this.userRepository.create(user);
  }

  async findUnique(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findUniqueById(id);
    if (!user) {
      throw new UserNotFoundException('존재하지 않는 유저입니다');
    }

    return user;
  }

  async findUniqueByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findUniqueByEmail(email);
    if (!user) {
      throw new UserNotFoundException('존재하지 않는 유저입니다');
    }

    return user;
  }
}
