import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './components/question/question';
import NewQuestion from './components/question/newQuestion';

function App() {
  const [questions, setQuestions] = useState([]);
  const fetchQuestions = () => {
    fetch('http://localhost:3000')
      .then(res => res.json())
      .then(res => setQuestions(res))
      .catch(err => console.log('fetch error: ', err))
  }
  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <>
      <NewQuestion fetchQuestions={fetchQuestions} />
      <div>
        {questions.map(question => <Question key={question.id} questionText={question.questionText} answers={question.answers} />)}
      </div>
    </>
  );
}

export default App;
