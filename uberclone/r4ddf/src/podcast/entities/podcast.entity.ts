import { Episode } from './episode.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Podcast {
  @Field((_) => Number)
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;
  @Field((_) => String)
  @Column()
  @IsString()
  title: string;
  @Field((_) => String)
  @Column()
  @IsString()
  category: string;
  @Field((_) => Number)
  @Column()
  @IsNumber()
  rating: number;
  @Field((_) => [Episode])
  @Column('jsonb')
  episodes: Episode[];
}
