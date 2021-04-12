import { ArgsType, Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./create-restaurant.dto";

// 얜 export 할 필요없지.
@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}

// InputType 으로 할수도 있음. 물론 그럼 resolver 에서 @Args('input') 처럼 이름 붙여줘야 겠지.
@ArgsType()
export class UpdateRestaurantDto {
  @Field(type => Number)
  id: number;

  @Field(type => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}