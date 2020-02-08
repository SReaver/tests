import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class Answers {
  @IsNotEmpty()
  answerId: string;
  @IsNotEmpty()
  answerText: string
}
export class NewQuestionValidator {

  @IsNotEmpty()
  questionText: string;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => Answers)
  answers: Answers[];

  @IsNotEmpty()
  correctAnswerId: string;

}
