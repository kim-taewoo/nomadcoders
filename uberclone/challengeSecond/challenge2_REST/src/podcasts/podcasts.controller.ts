import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastService: PodcastsService) {}

  @Get()
  getAll(): Podcast[] {
    return this.podcastService.getAll();
  }

  @Post()
  create(@Body() podcastData) {
    return this.podcastService.create(podcastData);
  }

  @Get(':id')
  getOne(@Param('id') podcastId: string): Podcast {
    return this.podcastService.getOne(podcastId);
  }

  @Delete(':id')
  remove(@Param('id') podcastId: string) {
    return this.podcastService.deleteOne(podcastId);
  }

  @Patch(':id')
  patch(@Param('id') podcastId: string, @Body() updateData) {
    return this.podcastService.update(podcastId, updateData);
  }

  @Get(':id/episodes')
  getAllEpisodes(@Param('id') podcastId): Episode[] {
    return this.podcastService.getAllEpisodes(podcastId);
  }

  @Post(':id/episodes')
  createEpisode(@Param('id') podcastId, @Body() episodeData) {
    return this.podcastService.createEpisode(podcastId, episodeData);
  }

  @Patch(':id/episodes/:episodeId')
  patchEpisode(
    @Param('id') podcastId,
    @Param('episodeId') episodeId,
    @Body() episodeData,
  ) {
    return this.podcastService.updateEpisode(podcastId, episodeId, episodeData);
  }

  @Delete(':id/episodes/:episodeId')
  removeEpisode(@Param('id') podcastId, @Param('episodeId') episodeId) {
    this.podcastService.deleteEpisode(podcastId, episodeId);
  }
}
