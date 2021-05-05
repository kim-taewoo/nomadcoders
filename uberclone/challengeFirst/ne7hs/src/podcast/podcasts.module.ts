import { Module } from '@nestjs/common';
import { EpisodeController, PodcastsController } from './podcasts.controller';
import { PodcastResolver } from './podcasts.resolver';
import { PodcastsService } from './podcasts.service';

@Module({
  controllers: [PodcastsController, EpisodeController],
  providers: [PodcastsService, PodcastResolver],
})
export class PodcastsModule {}
