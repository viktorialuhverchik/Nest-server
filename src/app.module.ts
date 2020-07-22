import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StoryModule } from './story/story.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Entities } from "./entities";

@Module({
  imports: [
      StoryModule,
      UserModule,
      AuthModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'viktor137',
        database: 'nest_db',
        entities: Entities,
        synchronize: true,
        autoLoadEntities: true
      })
  ]
})
export class AppModule {}
