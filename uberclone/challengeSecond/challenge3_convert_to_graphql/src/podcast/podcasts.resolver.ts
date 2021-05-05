import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Podcast } from './entities/podcast.entity';
import { Episode } from './entities/episode.entity';
import {
  CreatePodcastInput,
  PodcastSearchInput,
  UpdatePodcastInput,
} from './dtos/podcast.dto.input';
import {
  GetAllPodcastsOutput,
  CreatePodcastOutput,
  GetPodcastOutput,
} from './dtos/podcast.dto.output';
import { PodcastsService } from './podcasts.service';
import { CoreOutput } from './dtos/output.dto';
import {
  CreateEpisodeOutput,
  GetEpisodesOutput,
} from './dtos/episode.dto.output';
import {
  CreateEpisodeInput,
  EpisodesSearchInput,
  UpdateEpisodeInput,
} from './dtos/episode.dto.input';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => GetAllPodcastsOutput)
  getAllPodcasts(): GetAllPodcastsOutput {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => CreatePodcastOutput)
  createPodcast(
    @Args('input') createPodcastInput: CreatePodcastInput,
  ): CreatePodcastOutput {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query((returns) => GetPodcastOutput)
  getPodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): GetPodcastOutput {
    return this.podcastsService.getPodcast(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  deletePodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): CoreOutput {
    return this.podcastsService.deletePodcast(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  updatePodcast(
    @Args('input') updatePodcastInput: UpdatePodcastInput,
  ): CoreOutput {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }
}

@Resolver((of) => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query((returns) => GetEpisodesOutput)
  getEpisodes(
    @Args('input') podcastSearchInput: PodcastSearchInput,
  ): GetEpisodesOutput {
    return this.podcastService.getEpisodes(podcastSearchInput.id);
  }

  @Mutation((returns) => CreateEpisodeOutput)
  createEpisode(
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ): CreateEpisodeOutput {
    return this.podcastService.createEpisode(createEpisodeInput);
  }

  @Mutation((returns) => CoreOutput)
  updateEpisode(
    @Args('input') updateEpisodeInput: UpdateEpisodeInput,
  ): CoreOutput {
    return this.podcastService.updateEpisode(updateEpisodeInput);
  }

  @Mutation((returns) => CoreOutput)
  deleteEpisode(
    @Args('input') episodesSearchInput: EpisodesSearchInput,
  ): CoreOutput {
    return this.podcastService.deleteEpisode(episodesSearchInput);
  }
}
