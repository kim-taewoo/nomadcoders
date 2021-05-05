import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Episode } from '../entities/episode.entity';
import { UpdateEpisodeDto } from './update-episode.dto';

// export class UpdatePodcastDto {
//   readonly title?: string;
//   readonly category?: string;
//   readonly rating?: number;
//   readonly episodes?: Episode[];
// }

@ArgsType()
export class UpdatePodcastDto {
  @Field(is => String, { nullable: true })
  @IsOptional()
  title: string;
  @Field(is => String, { nullable: true })
  @IsOptional()
  category: string;
  @Field(is => Number, { nullable: true })
  @IsOptional()
  rating: number;
  @Field(is => [Episode], { nullable: 'itemsAndList' })
  @IsOptional()
  episodes: Episode[];
}
