import { Module } from '@nestjs/common';

import { UserService } from './application/services/user.service';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserResolver } from './interfaces/graphql/user.resolver';

@Module({
  providers: [
    UserService,
    UserResolver,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
