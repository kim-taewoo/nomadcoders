import { Episode } from './episode.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ nullable: true })
  @IsString()
  category: string;

  @Field((_) => Number, { defaultValue: 0 })
  @Column({ nullable: true, default: 0 }) // 보통은 nullable 과 default 둘 중에 하나를 쓸 것이다. 
  @IsOptional()
  @IsNumber()
  rating: number;

  @Field((_) => [Episode])
  @Column('jsonb', { nullable: true })
  episodes: Episode[];
}
