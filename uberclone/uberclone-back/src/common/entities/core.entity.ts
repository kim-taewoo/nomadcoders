import { Field } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field((_type) => Number)
  id: number;

  @CreateDateColumn()
  @Field((_type) => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((_type) => Date)
  updatedAt: Date;
}
