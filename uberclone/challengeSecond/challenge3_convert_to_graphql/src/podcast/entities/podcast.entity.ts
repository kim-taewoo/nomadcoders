import { Episode } from './episode.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from './core.entity';

@ObjectType()
export class Podcast extends CoreEntity {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  category: string;

  @Field((type) => Number)
  rating: number;

  @Field((type) => [Episode])
  episodes: Episode[];
}
