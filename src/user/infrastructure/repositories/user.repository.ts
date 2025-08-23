import { PrismaService } from '@/common/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@user/domain/entities/user.entity';
import { IUserRepository } from '@user/domain/i-repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        salt: user.salt,
      },
    });

    return UserEntity.reconstitute({
      id: createdUser.id,
      email: createdUser.email,
      hashedPassword: createdUser.password,
      salt: createdUser.salt,
      name: createdUser.name,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  }

  async findUniqueById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return UserEntity.reconstitute({
      id: user.id,
      email: user.email,
      hashedPassword: user.password,
      salt: user.salt,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findUniqueByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return UserEntity.reconstitute({
      id: user.id,
      email: user.email,
      hashedPassword: user.password,
      salt: user.salt,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
