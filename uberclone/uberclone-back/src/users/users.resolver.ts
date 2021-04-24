import { Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver((_of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query((_returns) => Boolean)
  hi() {
    return true;
  }
}
