import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsResolver } from './podcasts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from './entities/podcast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])],
  providers: [PodcastsService, PodcastsResolver],
})
export class PodcastsModule {}
