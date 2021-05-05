import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from './core.entity';
import { Podcast } from './podcast.entity';

@ObjectType()
export class Episode extends CoreEntity {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  category: string;

  @Field((type) => Number)
  rating: number;
}
