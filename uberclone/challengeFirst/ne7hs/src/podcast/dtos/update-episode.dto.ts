import { ArgsType, Field } from "@nestjs/graphql";

// export class UpdateEpisodeDto {
//   title?: string;
//   category?: string;
//   rating?: number;
// }

@ArgsType()
export class UpdateEpisodeDto {
  @Field(is => String, { nullable: true })
  title: string;
  @Field(is => String, { nullable: true })
  category: string;
  @Field(is => Number, { nullable: true })
  rating: number;
}