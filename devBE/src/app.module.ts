import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
