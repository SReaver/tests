import React from 'react'

export default function question({ questionText, answers }) {
  return (
    <div>
      <label>{questionText}</label>
      <div>
        <ol>
          {answers.map(answer => <li key={answer.answerId}>{answer.answerText}</li>)}
        </ol>
      </div>
    </div>
  )
}
