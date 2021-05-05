import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class CreatePodcastDto extends PickType(Podcast, [
  'title',
  'category',
], InputType) {}
