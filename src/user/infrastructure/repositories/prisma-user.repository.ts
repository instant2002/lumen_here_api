import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<UserEntity | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userData) {
      return null;
    }

    return UserEntity.revertToUserEntity(userData);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userData) {
      return null;
    }

    return UserEntity.revertToUserEntity(userData);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const userData = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return UserEntity.revertToUserEntity(userData);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const userData = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
        updatedAt: user.updatedAt,
      },
    });

    return UserEntity.revertToUserEntity(userData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
