import { Field, ObjectType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';
import { CoreOutput } from './output.dto';

@ObjectType()
export class GetEpisodesOutput extends CoreOutput {
  @Field((type) => [Episode], { nullable: true })
  episodes?: Episode[];
}

@ObjectType()
export class FindEpisodeOutput extends CoreOutput {
  episode?: Episode;
}

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  id?: string;
}
