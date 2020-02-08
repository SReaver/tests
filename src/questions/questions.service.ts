import { Question } from "./question.model";
import { Injectable } from "@nestjs/common";
import uuidv4 = require("uuid/v4");

@Injectable()
export class QuestionsService {
  questions: Question[] = [];
  getQuestions() {
    return this.questions;
  }
  addQuestion({ questionText, answers, correctAnswerId }) {
    const newQuestionId = uuidv4();
    const newQuestion = new Question(newQuestionId, questionText, answers, correctAnswerId);
    this.questions.push(newQuestion);
    return newQuestionId;
  }
}