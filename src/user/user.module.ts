import { Module } from '@nestjs/common';

import { PrismaService } from '../shared/infrastructure/prisma/prisma.service';

import { UserService } from './application/services/user.service';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserResolver } from './interfaces/graphql/user.resolver';

@Module({
  providers: [
    UserService,
    UserResolver,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
