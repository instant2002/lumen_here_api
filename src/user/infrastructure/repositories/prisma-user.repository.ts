import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userData) {
      return null;
    }

    return this.mapToUser(userData);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userData) {
      return null;
    }

    return this.mapToUser(userData);
  }

  async save(user: User): Promise<User> {
    const userData = await this.prisma.user.create({
      data: {
        id: user.getId(),
        email: user.getEmail(),
        password: user.getPassword(),
        name: user.getName(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      },
    });

    return this.mapToUser(userData);
  }

  async update(user: User): Promise<User> {
    const userData = await this.prisma.user.update({
      where: { id: user.getId() },
      data: {
        email: user.getEmail(),
        password: user.getPassword(),
        name: user.getName(),
        updatedAt: user.getUpdatedAt(),
      },
    });

    return this.mapToUser(userData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  private mapToUser(userData: any): User {
    return new User(
      userData.id,
      userData.email,
      userData.password,
      userData.name,
      userData.createdAt,
      userData.updatedAt,
    );
  }
}
