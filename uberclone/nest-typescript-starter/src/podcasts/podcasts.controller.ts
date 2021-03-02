import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  getAll(): Podcast[] {
    return this.podcastsService.getAll();
  }

  @Get(':id')
  getOne(@Param("id") podcastId: number): Podcast {
    return this.podcastsService.getOne(+podcastId)
  }

  @Post()
  create(@Body() podcastData) {
    return this.podcastsService.create(podcastData);
  }

  @Delete(":id")
  remove(@Param('id') podcastId: number) {
    return this.podcastsService.deleteOne(+podcastId)
  }

  @Patch(':id')
  patch(@Param('id') podcastId: number, @Body() updateData) {
    return this.podcastsService.update(+podcastId, updateData);
  }

  @Get(':id/episodes')
  getAllEpisodes(@Param('id') podcastId): Episode[] {
    return this.podcastsService.getAllEpisodes(+podcastId)
  }

  @Post(':id/episodes')
  addEpisode(@Param('id') podcastId, @Body() episodeData) {
    return this.podcastsService.addEpisode(+podcastId, episodeData)
  }

  @Patch(':id/episodes/:episodeId')
  patchEpisode(@Param('id') podcastId: number, @Param('episodeId') episodeId, @Body() updateData) {
    return this.podcastsService.updateEpisode(+podcastId, +episodeId, updateData)
  }

  @Delete(':id/episodes/:episodeId')
  removeEpisode(@Param('id') podcastId: number, @Param('episodeId') episodeId) {
    return this.podcastsService.removeEpisode(+podcastId, +episodeId)
  }
}
