import { ArgsType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

// export class CreatePodcastDto {
//   readonly title: string;
//   readonly category: string;
// }

// @InputType()
@ArgsType()
export class CreatePodcastDto {
  @Field(is => String)
  @IsString()
  title: string;
  @Field(is => String)
  @IsString()
  category: string;
}