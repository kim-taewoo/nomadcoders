import { Injectable, NotFoundException } from '@nestjs/common';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAll(): Podcast[] {
    return this.podcasts;
  }

  getOne(id: number): Podcast {
    const podcast = this.podcasts.find(podcast => podcast.id === id);
    if (!podcast) {
      throw new NotFoundException(`Podcast with ID ${id} not found`)
    }
    return podcast
  }

  deleteOne(id: number) {
    this.getOne(id) // 여기서 에러가 발생 안 하면 존재는 한다는 거겠지?
    this.podcasts = this.podcasts.filter(podcast => podcast.id !== id);
  }

  create(podcastData): void {
    this.podcasts.push({
      id: this.podcasts.length + 1,
      episodes: [],
      ...podcastData
    })
  }

  update(id: number, updateData): void {
    const podcast = this.getOne(id);
    this.deleteOne(id);
    this.podcasts.push({ ...podcast, ...updateData })
  }

  getAllEpisodes(id: number): Episode[] {
    const podcast = this.getOne(id);
    return podcast.episodes;
  }

  addEpisode(id: number, episodeData): void {
    const podcast = this.getOne(id);
    podcast.episodes.push({ id: podcast.episodes.length + 1, ...episodeData });
  }

  updateEpisode(id: number, episodeId: number, updateData): void {
    const podcast = this.getOne(id);
    const episodeIndex = podcast.episodes.findIndex(episode => episode.id === episodeId);
    if (episodeIndex === -1) {
      throw new NotFoundException(`Episode with ID ${episodeId} not found in the podcast ID ${id}`)
    }
    podcast.episodes[episodeIndex] = updateData;
  }

  removeEpisode(id: number, episodeId: number): void {
    const podcast = this.getOne(id);
    const episodes = podcast.episodes.filter(episode => episode.id !== episodeId);
    podcast.episodes = episodes;
  }
}
