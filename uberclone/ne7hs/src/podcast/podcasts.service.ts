import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dtos/create-episode.dto';
import { CreatePodcastDto } from './dtos/create-podcast.dto';
import { UpdateEpisodeDto } from './dtos/update-episode.dto';
import { UpdatePodcastDto } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAllPodcasts(): Podcast[] {
    return this.podcasts;
  }

  createPodcast({
    title,
    category,
  }: CreatePodcastDto): boolean {
    const id = Date.now();
    this.podcasts.push({ id, title, category, rating: 0, episodes: [] });
    return true;
  }

  getPodcast(id: string): Podcast {
    const foundPodcasts = this.podcasts.filter((podcast) => podcast.id === +id);
    if (foundPodcasts.length === 0) {
      return null;
    }
    if (foundPodcasts.length === 1) {
      return foundPodcasts[0];
    }
    if (foundPodcasts.length > 2) {
      return null;
    }
  }

  deletePodcast(id: string): boolean {
    this.podcasts = this.podcasts.filter((p) => p.id !== +id);
    return true;
  }

  updatePodcast(
    id: string,
    updatePodcastDto: UpdatePodcastDto,
  ): boolean {
    const podcast = this.getPodcast(id);
    if (!podcast) {
      return false;
    }
    const deleted = this.deletePodcast(id);
    if (!deleted) {
      return false;
    }
    this.podcasts.push({ ...podcast, ...updatePodcastDto });
    return true;
  }

  getEpisodes(
    podcastId: string,
  ): Episode[] {
    const podcast = this.getPodcast(podcastId);
    if (!podcast) {
      return null;
    }
    return podcast.episodes;
  }

  createEpisode(
    podcastId: string,
    { title, category }: CreateEpisodeDto,
  ): boolean {
    const podcast = this.getPodcast(podcastId);
    if (!podcast) {
      return false;
    }
    const episodeId = Date.now();
    const newEpisode: Episode = { id: episodeId, title, category, rating: 0 };
    const updated = this.updatePodcast(podcastId, {
      ...podcast,
      episodes: [...podcast.episodes, newEpisode],
    });
    if (!updated) {
      return false;
    }
    return true;
  }

  deleteEpisode(podcastId: string, episodeId: string): boolean {
    const podcast = this.getPodcast(podcastId);
    if (!podcast) {
      return false;
    }
    // 이 부분 이상하게 optional 한 프로퍼티까지 필수로 요구하면서 에러가 나서 어쩔 수 없이 spread operator 사용. 왜 그런지 모르겠음.
    // 분명히 updatePodcastDto 의 값들은 optional 인 상태인데...
    const updated = this.updatePodcast(podcastId, {
      ...podcast,
      episodes: podcast.episodes.filter((episode) => episode.id !== +episodeId),
    });
    if (!updated) {
      return false;
    }
    return true;
  }

  findEpisode(
    podcastId: string,
    episodeId: string,
  ): Episode {
    const episodes = this.getEpisodes(podcastId);
    if (!episodes) {
      return null;
    }
    const episode = episodes.find((episode) => episode.id === +episodeId);
    if (!episode) {
      return null;
    }
    return episode;
  }

  updateEpisode(
    podcastId: string,
    episodeId: string,
    updateEpisodeDto: UpdateEpisodeDto,
  ): boolean {
    const episode = this.findEpisode(
      podcastId,
      episodeId,
    );
    if (!episode) {
      return false;
    }
    const deleted = this.deleteEpisode(podcastId, episodeId);
    if (!deleted) {
      return false;
    }
    const podcast = this.getPodcast(podcastId);
    if (!podcast) {
      return false;
    }
    this.updatePodcast(podcastId, {
      ...podcast,
      episodes: [...podcast.episodes, { ...episode, ...updateEpisodeDto }],
    });
    return true;
  }
}
