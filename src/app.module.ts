import { QuestionsController } from './questions/questions.controller';
import { Module } from '@nestjs/common';
import { QuestionsService } from './questions/questions.service';

@Module({
  imports: [],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class AppModule { }
