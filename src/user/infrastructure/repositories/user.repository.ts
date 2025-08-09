import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/infrastructure/prisma/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/i-repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: user,
    });
    return new UserEntity().prismaToEntity(createdUser);
  }

  async findUniqueById(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return new UserEntity().prismaToEntity(user);
  }

  async findUniqueByEmail(email: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return new UserEntity().prismaToEntity(user);
  }
}
