import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@InputType()
export class CreateEpisodeInput extends PickType(
  Episode,
  ['title', 'category'],
  InputType,
) {
  @Field((type) => Int)
  podcastId: number;
}

@InputType()
export class EpisodesSearchInput {
  @Field((type) => Int)
  podcastId: number;

  @Field((type) => Int)
  episodeId: number;
}

@InputType()
export class UpdateEpisodePayload extends PartialType(
  PickType(Episode, ['title', 'category', 'rating'], InputType),
) {}

@InputType()
export class UpdateEpisodeInput extends EpisodesSearchInput {
  @Field((type) => UpdateEpisodePayload)
  payload: UpdateEpisodePayload;
}
