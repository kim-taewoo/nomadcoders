import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { jwtMiddleware } from './jwt/jwt.middleware';

// .forRoot 같은 메서드 없이 이름만 존재하는 모듈을 static module 이라고 하고,
// forRoot 과 같은 걸로 설정을 따로 하는 모듈을 dynamic module 이라고 한다.
// dynamic module 도 결국에는 static module 으로 바뀌게 되지만, 그 전에 설정이 가능한 것.
@Module({
  // I don't know why, but ConfigModule should come first to check env properly.
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      // localhost 에 연결할 거면 어차피 비번 첵 잘 안 해서 사실 크게 상관 없음.
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: true,
      entities: [User],
    }),
    GraphQLModule.forRoot({
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true, // use in memory
    }),
    // RestaurantsModule, // 안 쓰는 모듈을 지우기. 그렇다고 모든 모듈을 지우면, graphql 쿼리가 하나도 없는 상태가 되어서 에러가 뜬다.
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  // 아니면 이 Middleware 관련 설정을 main.ts 파일에서 app.use(jwtMiddleware)
  // 같이 전체 앱에 한 번에 적용할 수도 있다. 물론 세부설정하기엔 consumer 쓰는 게 좋겠지.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(jwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL,
    });
  }
}
