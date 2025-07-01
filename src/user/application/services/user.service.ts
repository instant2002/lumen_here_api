import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { EmailValueObject } from '../../domain/value-objects/email.vo';
import { PasswordValueObject } from '../../domain/value-objects/password.vo';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(email: string, password: string, name: string): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const passwordVO = new PasswordValueObject(password);
    const emailVO = new EmailValueObject(email);

    const user = UserEntity.create({ id: this.generateId(), email: emailVO, password: passwordVO, name });

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

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }

  async validatePassword(user: UserEntity, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
