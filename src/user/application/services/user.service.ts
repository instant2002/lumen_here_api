import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/i-repositories/user.repository.interface';
import { CreateUserInput } from '../../presentation/dto/input/create-user.input';

@Injectable()
export class UserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  async create(data: CreateUserInput): Promise<UserEntity> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = new UserEntity().create({ data, password: hashedPassword, salt });

    return this.userRepository.create(user);
  }

  async findUnique(id: number): Promise<UserEntity> {
    return this.userRepository.findUnique(id);
  }
}
