import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreatePodcastDto } from "./dtos/create-podcast.dto";
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
}