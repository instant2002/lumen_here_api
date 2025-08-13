import { PrismaModule } from '@common/infrastructure/prisma/prisma.module';
import { PrismaService } from '@common/infrastructure/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './application/services/user.service';
import { IUserRepository } from './domain/i-repositories/user.repository.interface';
import { IPasswordEncryptionService } from './domain/services/password-encryption.service';
import { UserModule } from './user.module';

// Mock PrismaService
const mockPrismaService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('UserModule Integration', () => {
  let app: INestApplication;
  let userService: UserService;
  let userRepository: IUserRepository;
  let passwordEncryptionService: IPasswordEncryptionService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userService = moduleFixture.get<UserService>(UserService);
    userRepository = moduleFixture.get<IUserRepository>('IUserRepository');
    passwordEncryptionService = moduleFixture.get<IPasswordEncryptionService>('IPasswordEncryptionService');
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(passwordEncryptionService).toBeDefined();
  });

  it('should have all required dependencies injected', () => {
    expect(userService['userRepository']).toBeDefined();
    expect(userService['passwordEncryptionService']).toBeDefined();
  });
});
