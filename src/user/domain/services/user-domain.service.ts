import { Injectable } from '@nestjs/common';

import { UserEntity } from '../entities/user.entity';
import { PasswordValueObject } from '../value-objects/password.vo';

@Injectable()
export class UserDomainService {
  async validatePassword(user: UserEntity, password: string): Promise<boolean> {
    const passwordVO = PasswordValueObject.fromHashed(user.password, user.salt);
    return passwordVO.verifyPassword(password);
  }
}
