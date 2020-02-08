/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import shortid from 'shortid';

export default function newQuestion({ fetchQuestions }) {
  const [question, setQuestion] = useState({
    questionText: '',
    answers: [{ answerId: shortid(), answerText: '' }],
    correctAnswerId: ''
  });
  const addAnswer = () => {
    const newQuestion = { ...question };
    newQuestion.answers = [...question.answers, { answerId: shortid(), answerText: '' }]
    setQuestion(newQuestion);
  }
  const submitNewQuestion = () => {
    console.log(question)
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    })
      .then(() => {
        setQuestion({
          questionText: '',
          answers: [{ answerId: shortid(), answerText: '' }],
          correctAnswerId: ''
        })
        fetchQuestions();
      })
      .catch(err => console.log('error post data: ', err))
  }
  const handleInputChange = (event) => {
    console.log(event.target);

    const editedQuestion = { ...question };
    if (event.target.name === 'questionText' || event.target.name === 'correctAnswerId') {
      editedQuestion[event.target.name] = event.target.value;
    } else {
      const findedAnswerIndex = question.answers.findIndex(answer => answer.answerId === event.target.name)
      if (findedAnswerIndex > -1) {
        editedQuestion.answers[findedAnswerIndex] = { answerId: event.target.name, answerText: event.target.value }
      }
    }
    setQuestion(editedQuestion);
  }
  const removeAnswerHandler = (event) => {
    const NewQuestion = { ...question };
    const findedAnswerIndex = question.answers.findIndex(answer => answer.answerId === event.target.name)
    if (findedAnswerIndex > -1) {
      if (question.answers[findedAnswerIndex].answerId === question.correctAnswerId) {
        NewQuestion.correctAnswerId = '';
      }
      NewQuestion.answers.splice(findedAnswerIndex, 1);
    }
    setQuestion(NewQuestion);
  }
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Вопрос:
          <input type='text' value={question.questionText} name='questionText' onChange={handleInputChange} />
        </label>
        {question.answers.map(answer => <div key={answer.answerId}>
          <input type="radio" value={answer.answerId} name="correctAnswerId" onChange={handleInputChange} />
          <input type='text' name={answer.answerId} value={answer.answerText} onChange={handleInputChange} />
          <input type='button' name={answer.answerId} value='Удалить' onClick={removeAnswerHandler} />
        </div>
        )}
        <button onClick={addAnswer}>Добавить вариант ответа</button>
        <button onClick={submitNewQuestion}>Создать</button>
      </div>
    </div>
  )
}
