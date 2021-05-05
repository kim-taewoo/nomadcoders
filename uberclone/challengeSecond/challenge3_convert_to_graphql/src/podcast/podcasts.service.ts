import { Injectable } from '@nestjs/common';
import {
  CreateEpisodeInput,
  EpisodesSearchInput,
  UpdateEpisodeInput,
} from './dtos/episode.dto.input';
import {
  CreateEpisodeOutput,
  GetEpisodesOutput,
  FindEpisodeOutput,
} from './dtos/episode.dto.output';
import { CoreOutput } from './dtos/output.dto';
import {
  CreatePodcastInput,
  UpdatePodcastInput,
} from './dtos/podcast.dto.input';
import {
  CreatePodcastOutput,
  GetAllPodcastsOutput,
  GetPodcastOutput,
} from './dtos/podcast.dto.output';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];

  getAllPodcasts(): GetAllPodcastsOutput {
    return { podcasts: this.podcasts, ok: true, err: null };
  }

  createPodcast({ title, category }: CreatePodcastInput): CreatePodcastOutput {
    const id = Date.now();
    this.podcasts.push({ id, title, category, rating: 0, episodes: [] });
    return { id, ok: true, err: null };
  }

  getPodcast(id: number): GetPodcastOutput {
    const podcast = this.podcasts.find((podcast) => podcast.id === +id);
    if (!podcast) {
      return { ok: false, err: 'No Podcast with the ID' };
    }
    return { podcast, ok: true, err: null };
  }

  deletePodcast(id: number): CoreOutput {
    this.podcasts = this.podcasts.filter((p) => p.id !== +id);
    return { err: null, ok: true };
  }

  updatePodcast({ id, payload }: UpdatePodcastInput): CoreOutput {
    const { podcast, err: findErr } = this.getPodcast(id);
    if (findErr) {
      return { ok: false, err: findErr };
    }
    const { err: deleteErr } = this.deletePodcast(id);
    if (deleteErr) {
      return { ok: false, err: deleteErr };
    }
    this.podcasts.push({ ...podcast, ...payload });
    return { ok: true, err: null };
  }

  getEpisodes(podcastId: number): GetEpisodesOutput {
    const { podcast, err } = this.getPodcast(podcastId);
    if (err) {
      return { episodes: null, ok: false, err };
    }
    return { episodes: podcast.episodes, ok: true, err: null };
  }

  createEpisode({
    podcastId,
    title,
    category,
  }: CreateEpisodeInput): CreateEpisodeOutput {
    const { podcast, err: findErr } = this.getPodcast(podcastId);
    if (findErr) {
      return { ok: false, err: findErr };
    }
    const episodeId = Date.now();
    const newEpisode: Episode = { id: episodeId, title, category, rating: 0 };
    const { err } = this.updatePodcast({
      id: podcast.id,
      payload: {
        ...podcast,
        episodes: [...podcast.episodes, newEpisode],
      },
    });
    if (err) {
      return { err, ok: false };
    }
    return { ok: true, id: episodeId };
  }

  deleteEpisode({ podcastId, episodeId }: EpisodesSearchInput): CoreOutput {
    const { podcast, err: findErr } = this.getPodcast(podcastId);
    if (findErr) {
      return { ok: false, err: findErr };
    }
    const { err } = this.updatePodcast({
      id: podcast.id,
      payload: {
        ...podcast,
        episodes: podcast.episodes.filter(
          (episode) => episode.id !== episodeId,
        ),
      },
    });
    if (err) {
      return { ok: false, err };
    }
    return { ok: true };
  }

  findEpisode({
    podcastId,
    episodeId,
  }: EpisodesSearchInput): FindEpisodeOutput {
    const { episodes, err: findErr } = this.getEpisodes(podcastId);
    if (findErr) {
      return { ok: false, err: findErr };
    }
    const episode = episodes.find((episode) => episode.id === +episodeId);
    if (!episode) {
      return { ok: false, err: 'Episode not found' };
    }
    return { episode, ok: true, err: null };
  }

  updateEpisode({
    podcastId,
    episodeId,
    payload,
  }: UpdateEpisodeInput): CoreOutput {
    const { episode, err: findEpisodeErr } = this.findEpisode({
      podcastId,
      episodeId,
    });
    if (findEpisodeErr) {
      return { ok: false, err: findEpisodeErr };
    }
    const { err: deleteErr } = this.deleteEpisode({ podcastId, episodeId });
    if (deleteErr) {
      return { ok: false, err: deleteErr };
    }
    const { podcast, err: findPodcastErr } = this.getPodcast(podcastId);
    if (findPodcastErr) {
      return { ok: false, err: findPodcastErr };
    }
    const { err } = this.updatePodcast({
      id: podcast.id,
      payload: {
        ...podcast,
        episodes: [...podcast.episodes, { ...episode, ...payload }],
      },
    });
    if (err) {
      return {
        ok: false,
        err: 'Update episode error.',
      };
    }
    return { ok: true };
  }
}
