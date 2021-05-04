import { Injectable, NotFoundException } from '@nestjs/common';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAll(): Podcast[] {
    return this.podcasts;
  }

  getOne(id: string): Podcast {
    const podcast = this.podcasts.find((podcast) => podcast.id === Number(id));
    if (!podcast)
      throw new NotFoundException(`Podcast with ID ${id} not found.`);
    return podcast;
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.podcasts = this.podcasts.filter(
      (podcast) => podcast.id !== Number(id),
    );
  }

  create(podcastData) {
    this.podcasts.push({
      id: this.podcasts.length + 1,
      ...podcastData,
    });
  }

  update(id: string, updateData) {
    const podcast = this.getOne(id);
    this.deleteOne(id);
    this.podcasts.push({ ...podcast, ...updateData });
  }

  getAllEpisodes(id: string) {
    const podcast = this.getOne(id);
    return podcast.episodes;
  }

  createEpisode(id: string, episodeData) {
    const podcast = this.getOne(id);
    const episodeId = podcast.episodes.length + 1;
    this.update(id, {
      episodes: [...podcast.episodes, { id: episodeId, ...episodeData }],
    });
  }

  updateEpisode(id: string, episodeId: string, episodeData) {
    const podcast = this.getOne(id);
    const updatedEpisodes = podcast.episodes.map((episode) => {
      if (episode.id === Number(episodeId))
        return { ...episode, ...episodeData };
      return episode;
    });
    this.update(id, { episodes: updatedEpisodes });
  }

  deleteEpisode(id: string, episodeId: string) {
    const podcast = this.getOne(id);
    const updatedEpisodes = podcast.episodes.filter(
      (episode) => episode.id !== Number(episodeId),
    );
    this.update(id, { episodes: updatedEpisodes });
  }
}
