import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import { TypegooseModule } from 'nestjs-typegoose';
import { TerminusOptionsService } from './terminus-options.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./user/user.module"
import { FormModule } from "./form/form.module"
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/ohmyform', { useNewUrlParser: true }),
    MongooseModule.forRoot('mongodb://localhost/ohmyform'),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    UserModule,
    FormModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
