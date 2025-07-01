import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(email: string, password: string, name?: string): Promise<UserEntity> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = UserEntity.create({ id: this.generateId(), email, password: hashedPassword, name });

    return await this.userRepository.save(user);
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

    const hashedPassword = await bcrypt.hash(password, 10);
    user.updatePassword(hashedPassword);
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
