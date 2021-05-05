import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreEntity {
  // Date.now() 로 생성되는 timestamp 는 32비트 보다 큰 수라서 string 으로 해야 함.
  @Field((type) => String)
  id: string;
}
