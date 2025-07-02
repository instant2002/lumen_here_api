import { Module } from '@nestjs/common';

import { UserService } from './application/services/user.service';
import { UserDomainService } from './domain/services/user-domain.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserResolver } from './interfaces/graphql/user.resolver';

@Module({
  providers: [
    UserService,
    UserDomainService,

    UserResolver,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService, UserDomainService],
})
export class UserModule {}
