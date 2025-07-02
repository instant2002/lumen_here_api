import { Module } from '@nestjs/common';

import { UserService } from './application/services/user.service';
import { UserDomainService } from './domain/services/user-domain.service';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserResolver } from './interfaces/graphql/user.resolver';

@Module({
  providers: [
    UserService,
    UserDomainService,

    UserResolver,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService, UserDomainService],
})
export class UserModule {}
