import { Field, ObjectType } from "@nestjs/graphql";

// export class Episode {
//   id: number;
//   title: string;
//   category: string;
//   rating: number;
// }

@ObjectType()
export class Episode {
  @Field(is => Number)
  id: number;
  @Field(is => String)
  title: string;
  @Field(is => String)
  category: string;
  @Field(is => Number)
  rating: number;
}