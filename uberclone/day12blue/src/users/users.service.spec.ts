import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const mockRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  checkPassword: jest.fn(),
  findOneOrFail: jest.fn(),
};

const mockJwstService = {
  sign: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: MockRepository<User>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        // 진짜 UserService 를 가져와서, User Repository 와, 필요한 Services 를 mocking 해서 쓴다.
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwstService,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAccount', () => {
    it('should fail if user exists', async () => {
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'dkdkdkdk',
      });
      const result = await service.createAccount({
        email: 'test@naver.com',
        password: 'ee',
        role: 0,
      });

      expect(result).toMatchObject({
        ok: false,
        error: `There is a user with that email already`,
      });
    });
  });

  it.todo('createAccount');
  it.todo('login');
  it.todo('me');
  it.todo('seeProfile');
  it.todo('editProfile');
});
