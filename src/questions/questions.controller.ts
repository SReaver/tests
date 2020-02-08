import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { NewQuestionValidator } from './validator'


@Controller()
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) { }

  @Get()
  getQuestions() {
    return this.questionService.getQuestions();
  }
  @Post()
  addQuestion(@Body() NewQuestion: NewQuestionValidator) {
    const questionId = this.questionService.addQuestion(NewQuestion);
    return { questionId };
  }
}
