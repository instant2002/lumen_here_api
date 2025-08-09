import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserResolver } from './presentation/resolvers/user.resolver';

const resolvers = [UserResolver];
const services = [UserService];
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
