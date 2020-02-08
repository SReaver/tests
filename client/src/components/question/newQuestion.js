/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import shortid from 'shortid';

export default function newQuestion() {
  const [question, setQuestion] = useState({
    questionText: '',
    answers: { [shortid()]: '' },
    correctAnswerId: ''
  });
  const addAnswer = () => {
    const newQuestion = { ...question };
    newQuestion.answers = { ...newQuestion.answers, [shortid()]: '' }
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
      .catch(err => console.log('error post data: ', err))
    setQuestion({
      questionText: '',
      answers: { [shortid()]: '' },
      correctAnswerId: ''
    })
  }
  const handleInputChange = (event) => {
    const editedQuestion = { ...question };
    if (event.target.name === 'questionText' || event.target.name === 'correctAnswerId') {
      editedQuestion[event.target.name] = event.target.value;
    } else {
      editedQuestion.answers[event.target.name] = event.target.value;
    }
    setQuestion(editedQuestion);
  }
  const removeAnswerHandler = (event) => {
    const NewQuestion = { ...question };
    delete NewQuestion.answers[event.target.name];
    setQuestion(NewQuestion);
  }
  const mapObject = (object, callback) => Object.keys(object).map(key => callback(key, object[key]));

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Вопрос:
          <input type='text' value={question.questionText} name='questionText' onChange={handleInputChange} />
        </label>
        {mapObject(question.answers, (key, value) => <div key={key}>
          <input type="radio" value={key} name="correctAnswerId" onChange={handleInputChange} />
          <input type='text' name={key} value={value} onChange={handleInputChange} />
          <input type='button' name={key} value='Удалить' onClick={removeAnswerHandler} />
        </div>
        )}
        <button onClick={addAnswer}>Добавить вариант ответа</button>
        <button onClick={submitNewQuestion}>Создать</button>
      </div>
    </div>
  )
}
