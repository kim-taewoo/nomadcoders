import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@InputType()
export class CreateEpisodeInput extends PickType(
  Episode,
  ['title', 'category'],
  InputType,
) {
  @Field((type) => String)
  podcastId: string;
}

@InputType()
export class EpisodesSearchInput {
  @Field((type) => String)
  podcastId: string;

  @Field((type) => String)
  episodeId: string;
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
