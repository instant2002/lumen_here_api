import { Module } from '@nestjs/common';
import { UserService } from '@user/application/services/user.service';
import { UserRepository } from '@user/infrastructure/repositories/user.repository';
import { CryptoPasswordEncryptionService } from '@user/infrastructure/utils/crypto.util';
import { UserResolver } from '@user/presentation/resolvers/user.resolver';

const resolvers = [UserResolver];
const services = [
  UserService,
  {
    provide: 'IPasswordEncryptionService',
    useClass: CryptoPasswordEncryptionService,
  },
];
const repositories = [
  {
    provide: 'IUserRepository',
    useClass: UserRepository,
  },
];

@Module({
  providers: [...services, ...resolvers, ...repositories],
  exports: services,
})
export class UserModule {}
