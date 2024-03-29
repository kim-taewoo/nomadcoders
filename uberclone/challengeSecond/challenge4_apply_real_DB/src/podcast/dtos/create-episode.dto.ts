import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';
import { CoreOutput } from './output.dto';

@InputType()
export class CreateEpisodeInput extends PickType(Episode, [
  'title',
  'category',
]) {
  @Field((type) => Int)
  podcastId: number;
}

@ObjectType()
export class CreateEpisodeOutput extends CoreOutput {
  @Field((type) => Int, { nullable: true })
  id?: number;
}
