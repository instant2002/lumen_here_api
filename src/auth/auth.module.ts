import { AuthService } from '@/auth/application/services/auth.service';
import { JwtTokenService } from '@/auth/infrastructure/services/jwt-token.service';
import { AuthResolver } from '@/auth/presentation/resolvers/auth.resolver';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

const resolvers = [AuthResolver];
const services = [
  AuthService,
  {
    provide: 'ITokenService',
    useClass: JwtTokenService,
  },
];

@Module({
  providers: [...resolvers, ...services],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
