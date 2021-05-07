import { Episode } from './episode.entity';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber, Min, Max } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from './core.entity';

@Entity()
@InputType('PodcastInput', { isAbstract: true })
@ObjectType()
export class Podcast extends CoreEntity {
  @Column()
  @Field((_) => String)
  @IsString()
  title: string;

  @Column()
  @Field((_) => String)
  @IsString()
  category: string;

  @Column({ default: 0 })
  @Field((_) => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @OneToMany(() => Episode, (episode) => episode.podcast)
  @Field((_) => [Episode])
  episodes: Episode[];
}
