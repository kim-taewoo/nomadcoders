import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PodcastsModule } from './podcast/podcasts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod'
    }),
    PodcastsModule,
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.20.224.1',
      port: 5432,
      username: 'taewookim',
      password: '0419',
      database: 'nuber-eats',
      logging: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
