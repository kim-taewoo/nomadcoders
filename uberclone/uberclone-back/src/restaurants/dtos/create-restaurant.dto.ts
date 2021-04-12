import { InputType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

// @ArgsType 를 쓰면 인자를 {} 로 묶지 않고 하나하나 입력할 수 있게 할 수 있다.
// 하지만 Omit, Pick, Partial, Intersection 같은 Mapped Type 를 쓰려면
// @InputType 를 써야한다는 제약이 존재한다.
// Entity 에 @InputType({isAbstract: true}) 라고 하지 않고
// 여기서 OmitType(Restaurant, ['id'], InputType) 라고 추가 인자를 넣어
// extends 결과 타입을 뭘로 할 지 정할 수도 있다.
@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {}
