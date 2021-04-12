import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// dto 에서 이 entity 를 기준으로 Omit 등을 해서 가공해 InputType 으로 쓰려면,
// 이 entity 자체가 inputType 여야 한다.
// 따라서 @InputType({isAbstract: true}) 를 써서 이 Entity 가
// 자기자신은 InputType이 아니지만 extends 된 후 InputType 으로 쓰일 수 있도록 할 수 있다.
// 즉, InputType 으로써는 스키마에 포함되지 않게 된다.
// 혹은 여기는 @InputType 내용 작성하지 않고, Mapped Type 를 사용하는 곳에서 (예: dtos)
// 세번째 인자로 InputType 로 받아오겠다고 할 수 있다.
@InputType({ isAbstract: true })
@ObjectType() // GraphQL 관련
@Entity() // TypeORM 관련
export class Restaurant {
  @Field((type) => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column()
  name: string;

  @Field((type) => Boolean, { defaultValue: true }) // GraphQL
  @Column({ default: true }) // database
  @IsOptional() // validation (dto)
  @IsBoolean() // validation (dto)
  isVegan: boolean;

  @Field((type) => String)
  @Column()
  address: string;

  @Field((type) => String)
  @Column()
  ownersName: string;

  // @Field(type => String)
  // @Column()
  // categoryName: string;
}
