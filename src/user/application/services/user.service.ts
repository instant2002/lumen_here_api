import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/i-repositories/user.repository.interface';
import { CreateUserInput } from '../../presentation/dto/input/create-user.input';

@Injectable()
export class UserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async create(data: CreateUserInput): Promise<UserEntity> {
    const existingUser = await this.userRepository.findUniqueByEmail(data.email);
    if (existingUser) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    const user = new UserEntity().create(data);
    return this.userRepository.create(user);
  }

  async findUnique(id: number): Promise<UserEntity> {
    return this.userRepository.findUniqueById(id);
  }
}
