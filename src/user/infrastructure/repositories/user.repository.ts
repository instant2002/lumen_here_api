import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/infrastructure/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
}
