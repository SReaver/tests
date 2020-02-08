import { IsNotEmpty, ValidateNested, IsByteLength, Length } from 'class-validator';
import { Type } from '@nestjs/common';

export class Answers {
  [k: string]: string;
}
export class NewQuestionValidator {

  @IsNotEmpty()
  questionText: string;


  @IsNotEmpty()
  @ValidateNested()
  answers: Answers;

  @IsNotEmpty()
  correctAnswerId: string;
}
