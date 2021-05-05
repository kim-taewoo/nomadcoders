import { InputType, PartialType, PickType, Field } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class CreatePodcastInput extends PickType(
  Podcast,
  ['title', 'category'],
  InputType,
) {}

@InputType()
export class PodcastSearchInput extends PickType(Podcast, ['id'], InputType) {}

@InputType()
export class UpdatePodcastPayload extends PartialType(
  PickType(Podcast, ['title', 'category', 'rating'], InputType),
) {}

@InputType()
export class UpdatePodcastInput extends PickType(Podcast, ['id'], InputType) {
  @Field((type) => UpdatePodcastPayload)
  payload: UpdatePodcastPayload;
}
