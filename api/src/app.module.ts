import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusOptionsService } from './terminus-options.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./users/users.module"
import {FormsModule} from "./forms/forms.module"
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ohmyform'),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    UsersModule,
    FormsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
