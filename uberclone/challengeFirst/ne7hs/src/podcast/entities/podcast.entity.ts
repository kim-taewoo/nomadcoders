import { Field, ObjectType } from '@nestjs/graphql';
import { Episode } from './episode.entity';

// export class Podcast {
//   id: number;
//   title: string;
//   category: string;
//   rating: number;
//   episodes: Episode[];
// }

@ObjectType()
export class Podcast {
  @Field(is => Number)
  id: number;
  @Field(is => String)
  title: string;
  @Field(is => String)
  category: string;
  @Field(is => Number)
  rating: number;
  @Field(is => [Episode])
  episodes: Episode[];
}
