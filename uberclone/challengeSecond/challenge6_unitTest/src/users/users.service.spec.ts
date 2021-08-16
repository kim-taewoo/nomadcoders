import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  // beforeAll 에서 만든 테스팅 모듈을 유닛 테스트들에서 가져다 쓰기 위해 이렇게 전역?변수 정의
  let service: UsersService;

  beforeAll(async () => {
    const nestTestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();
    service = nestTestingModule.get<UsersService>(UsersService);
  });

  it('be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('createAccount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
});
