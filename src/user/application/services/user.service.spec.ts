import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '@user/application/dtos/create-user.dto';
import { UserEntity } from '@user/domain/entities/user.entity';
import { IUserRepository } from '@user/domain/i-repositories/user.repository.interface';
import { IPasswordEncryptionService } from '@user/domain/services/password-encryption.service';
import { PasswordVO } from '@user/domain/value-objects/password.vo';
import { CustomNotFoundException } from '../../../common/exceptions';
import { UserService } from './user.service';

// Mock 클래스들
class MockUserRepository implements IUserRepository {
  create(user: UserEntity): Promise<UserEntity> {
    return Promise.resolve(user);
  }

  findUniqueById(id: number): Promise<UserEntity | null> {
    if (id === 1) {
      const user = UserEntity.create({
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedPassword',
        salt: 'salt',
      });
      // Mock에서 id 설정
      user.id = 1;
      return Promise.resolve(user);
    }
    return Promise.resolve(null);
  }

  findUniqueByEmail(_email: string): Promise<UserEntity | null> {
    return Promise.resolve(null);
  }
}

class MockPasswordEncryptionService implements IPasswordEncryptionService {
  hashPassword(_password: PasswordVO): { hashedPassword: string; salt: string } {
    return {
      hashedPassword: 'hashedPassword123',
      salt: 'salt123',
    };
  }

  verifyPassword(_password: PasswordVO, _hashedPassword: string, _salt: string): boolean {
    return true;
  }
}

describe('UserService', () => {
  let service: UserService;
  let passwordEncryptionService: MockPasswordEncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'IUserRepository',
          useClass: MockUserRepository,
        },
        {
          provide: 'IPasswordEncryptionService',
          useClass: MockPasswordEncryptionService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    passwordEncryptionService = module.get<MockPasswordEncryptionService>('IPasswordEncryptionService');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password123@',
        name: 'Test User',
      };

      const result = await service.create(createUserDTO);

      expect(result).toBeDefined();
      expect(result.email).toBe(createUserDTO.email);
      expect(result.name).toBe(createUserDTO.name);
      expect(result.password).toBe('hashedPassword123');
      expect(result.salt).toBe('salt123');
    });

    it('should hash password before creating user', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password123@',
        name: 'Test User',
      };

      const hashSpy = jest.spyOn(passwordEncryptionService, 'hashPassword');

      await service.create(createUserDTO);

      expect(hashSpy).toHaveBeenCalledWith(expect.any(PasswordVO));
    });
  });

  describe('findUnique', () => {
    it('should return user when user exists', async () => {
      const result = await service.findUnique(1);

      expect(result).toBeDefined();
      expect(result?.id).toBe(1);
      expect(result?.email).toBe('test@example.com');
    });

    it('should throw CustomNotFoundException when user does not exist', async () => {
      await expect(service.findUnique(999)).rejects.toThrow(CustomNotFoundException);
      await expect(service.findUnique(999)).rejects.toThrow('존재하지 않는 유저입니다');
    });
  });
});
