import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { UserResolver } from './presentation/resolvers/user.resolver';

const resolvers = [UserResolver];
const services = [UserService];

@Module({
  providers: [...services, ...resolvers],
  exports: services,
})
export class UserModule {}
