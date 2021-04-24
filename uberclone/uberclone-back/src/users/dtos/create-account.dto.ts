import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
] as const) {}

@ObjectType()
export class CreateAccountOutput {
  @Field((_type) => String, { nullable: true })
  error?: string;

  @Field((_type) => Boolean)
  ok: boolean;
}
