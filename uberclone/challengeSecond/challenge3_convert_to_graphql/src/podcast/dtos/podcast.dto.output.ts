import { Field, ObjectType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';
import { CoreOutput } from './output.dto';

@ObjectType()
export class GetAllPodcastsOutput extends CoreOutput {
  @Field((type) => [Podcast], { nullable: true })
  podcasts?: Podcast[];
}

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  id?: string;
}

@ObjectType()
export class GetPodcastOutput extends CoreOutput {
  @Field((type) => Podcast, { nullable: true })
  podcast?: Podcast;
}
