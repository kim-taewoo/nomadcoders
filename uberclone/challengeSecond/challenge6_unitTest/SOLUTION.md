User entity
일단 user module을 만듭니다. nest g mo user
그리고 user.entity.ts를 살펴보면..
entity 선언 상단에 enum 타입으로 UserRole을 선언했습니다. role based authorization을 구현하라 하였기 때문에 uber-eats 클론 강의에서와 마찬가지로 enum 타입으로 role을 선언하고, registerEnumType함수를 이용하여 graphql에 enum type을 등록한 내용입니다.
CRUD & resolvers
CRUD를 위해 resolver와 service를 만듭니다. nest g r users, nest g s users
service를 만들고 user entity의 repository와 연결 설정도 합니다.
service와 resolver를 만드실 때 DTO를 고려하셔서 어떻게 입력을 받을까 고려하시고 DTO들도 같이 만들어 주도록 합니다.
createAccount, login, editProfile, seeProfile을 만들라하는 것이 과제이므로, resolver를 만든 후 구현해야 할 것은 1. 패스워드 hash처리. 2. jwt 처리, 3. 클라이언트에서 들어온 jwt 토큰 정보를 이용하여 로그인 처리, 4. 로그인한 유저 정보 가져오기 등이 되겠습니다.
password hash 처리
다행히 typeorm에는 @BeforeInsert , @BeforeUpdate 데코레이터들이 있어 이것들을 이용하면 쉽게 저장 또는 변경되기 전에 패스워드를 hash 처리할 수 있습니다.
위의 코드에서 bcrypt 패키지를 사용한 것을 볼 수가 있습니다.
jwt 처리
챌린지 조건에서 jwt 모듈을 따로 만들면 가산점이 있다고 나와 있군요. 일단 모듈을 만듭니다. src/jwt/jwt.module.ts
jwt 모듈 파일입니다. jwt 모듈에서는 설정을 받을 것이 있기 때문에, DynamicModule 형식으로 따로 forRoot method를 만들어 줘야합니다.
또한 forRoot method를 정의하는데 앞에 static으로 지정되어 있습니다. 이는 클래스 인스턴스를 만들지 않아도 JwtModule.forRoot() 이런식으로 사용할 수 있게끔 해주는 접근 제어자입니다.
모듈의 provider를 보면, { provide, useClass 또는 useValue 등등 }의 형태이며, 일반적으로 provider에 JwtService라고 사용하는것은 {provide: JwtService, useClass:JwtService}의 축약형입니다. option 값을 위에서는 { provide: CONFIG_OPTIONS, useValue: options }로 받는 것입니다.
이렇게 정의한 custom value provider는 service 파일에서 이렇게 사용합니다.
constructor( **@Inject** (CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {}
@Global 데코레이터는 이 모듈은 Global하다. 즉, 한번 모듈을 import 하면 전역적으로 어디서든 사용할 수 있는 의미가 됩니다. 한번 app 모듈에서 import 해 놓으면 굳이 다른 모듈에서 또 import 할 필요 없습니다.
src/jwt/jwt.middleware.ts
nestjs에서는 middleware를 이렇게 선언을 해주면 됩니다.
물론 콘솔) nest g mi jwt 이런식으로 만드셔도 되고, 공식 문서를 참고하셔서 만드셔도 괜찮습니다. middleware에서 service를 사용하기 위해 constructor에서 parameter properties를 이용한 것이 보입니다.
이렇게 생성한 middleware 아래와 같이 사용해 주시면 됩니다. 참고: Applying Middleware, NestJS
로그인 파트
src/users/users.service.ts
위의 코드를 보시면 user의 checkPassword 메소드를 이용해서 우리가 입력한 패스워드와 hashing 시켜 놓은 password가 일치하는지 확인하는 로직이 보이시나요? 그 다음에 const token = this.jwtService.sign(user.id)라는 코드로 우리의 user.id를 json web token으로 만드는 것입니다.
만들어진 토큰은 jwt.io에 가보시면 만들어진 토큰을 테스트 해볼 수 있습니다.
Guard
Guard는 일단 개념 파악을 위해 Nestjs의 문서를 보고 시작하는 것이 좋을 것 같습니다. nestjs에서는 유저 인증, 권한부여를 위해서 guard라는 개념을 사용합니다.
src/auth/auth.guard.ts
graphql에서 context가 무엇인지 혹시 잘 모르시겠다면, graphql 공식 문서 참고하시면 조금 도움이 되시지 않을까 합니다. graphql의 context에는 유저 인증 정보가 들어가 있습니다.
그런데 우리는 아직 graphql context에 user 정보를 넘겨준 적이 없습니다. context에 user 정보를 넘겨주려면, graphql 모듈을 app 모듈에서 import 하는 단계에서 설정을 해줘야 합니다.
위에서 만든 AuthGuard는 @UseGuards 데코레이터를 이용하여 사용할 수 있습니다.
**@UseGuards** (AuthGuard) createPodast(...)
위의 코드와 같이 createPodcast resolver위에 @UseGuards 데코레이터를 이용하면 유저 인증이 완성이 됩니다. 로그인 하지 않은 채로, 즉 로그인 토큰을 헤더에 제공하지 않은 상태로 createPodcast resolver를 사용하면 Forbidden Resource 에러가 발생하게 됩니다.
로그인 유저 정보 획득
위 코드를 보면 앞에 AuthGuard 코드와 유사점이 보입니다만, createParamDecorator라는 것이 보입니다.
context에서 user 정보를 리턴해주는 역할을 하는 데코레이터입니다.
사용방법은 me( **@AuthUser** () authUser: User): User 이런 식으로 사용할 수 있습니다.
결론
챌린지 과제 자체는 단순해 보이지만, 상당히 길고 많은 내용을 다뤄야 하는 파트였습니다.
이번 챌린지를 통해 entity 만들기, resolver, 패스워드 hashing, jwt 암호화와 해독, 미들웨어 작성과 적용, 클라이언트에서 받은 토큰 정보를 해독해서 graphql로 인증정보 넘겨주기까지 상당히 많은 양을 다루는 과제였습니다.
어려운 과제이지만, 우버이츠 클론 과정 복습하는 과정이라 생각하시고 복습하시면 많은 도움되실 것 같습니다.
