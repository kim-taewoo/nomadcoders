import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateEpisodeDto } from "./dtos/create-episode.dto";
import { CreatePodcastDto } from "./dtos/create-podcast.dto";
import { UpdateEpisodeDto } from "./dtos/update-episode.dto";
import { UpdatePodcastDto } from "./dtos/update-podcast.dto";
import { Episode } from "./entities/episode.entity";
import { Podcast } from "./entities/podcast.entity";
import { PodcastsService } from "./podcasts.service";

// 일일이 GraphQL 리턴 타입을 만들어야 하는지 모르겠지만
// 시간상 코드 수정하여 작성.

@Resolver(of => Podcast) // 여기 of 는 필수아님. 비워둬도 된다.
export class PodcastResolver {
  constructor(private readonly podcastsService: PodcastsService) { }

  @Query(returns => [Podcast])
  podcasts() {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation(returns => Boolean)
  createPodcast(@Args() createPodcastDto: CreatePodcastDto) {
    return this.podcastsService.createPodcast(createPodcastDto);
  }

  @Query(returns => Podcast)
  getPodcast(@Args('id') id: string) {
    return this.podcastsService.getPodcast(id);
  }

  @Mutation(returns => Boolean)
  updatePodcast(
    @Args('id') id: string,
    @Args() updatePodcastDto: UpdatePodcastDto,
  ) {
    return this.podcastsService.updatePodcast(id, updatePodcastDto);
  }

  @Mutation(returns => Boolean)
  deletePodcast(@Args('id') id: string) {
    return this.podcastsService.deletePodcast(id);
  }

  @Query(returns => [Episode])
  getEpisodes(@Args('id') podcastId: string) {
    return this.podcastsService.getEpisodes(podcastId);
  }

  @Mutation(returns => Boolean)
  createEpisode(
    @Args('id') podcastId: string,
    @Args() createEpisodeDto: CreateEpisodeDto,
  ) {
    return this.podcastsService.createEpisode(podcastId, createEpisodeDto);
  }

  @Mutation(returns => Boolean)
  updateEpisode(
    @Args('id') podcastId: string,
    @Args('episodeId') episodeId: string,
    @Args() updateEpisodeDto: UpdateEpisodeDto,
  ) {
    return this.podcastsService.updateEpisode(
      podcastId,
      episodeId,
      updateEpisodeDto,
    );
  }

  @Mutation(returns => Boolean)
  deleteEpisode(
    @Args('id') podcastId: string,
    @Args('episodeId') episodeId: string,
  ) {
    return this.podcastsService.deleteEpisode(podcastId, episodeId);
  }
}