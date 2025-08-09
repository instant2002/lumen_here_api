import { Module } from '@nestjs/common';

import { UserService } from './application/services/user.service';
import { UserDomainService } from './domain/services/user-domain.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { CryptoPasswordEncryptionService } from './infrastructure/utils/crypto.util';
import { UserResolver } from './presentation/resolvers/user.resolver';

const resolvers = [UserResolver];
const services = [UserService];
const repositories = [
  {
    provide: 'IUserRepository',
    useClass: UserRepository,
  },
];
const domainServices = [
  {
    provide: 'IPasswordEncryptionService',
    useClass: CryptoPasswordEncryptionService,
  },
  {
    provide: 'IUserDomainService',
    useClass: UserDomainService,
  },
];

@Module({
  providers: [...services, ...resolvers, ...repositories, ...domainServices],
  exports: services,
})
export class UserModule {}
