import { Podcast } from './podcast.entity';

export class Episode {
  id: number;
  author: string;
  title: string;
  length: number;
  category: string;
  podcast: Podcast;
}
