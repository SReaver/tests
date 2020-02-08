import { Answers } from './validator';
export class Question {
  constructor(public id: string, public questionText: string, public answers: Answers[], private correctAnswerId: string) { }
}