import "./QuestionItem.css";
import { useState } from "react";

export default function QuestionItem({
  question,
  handleSelectedItem,
  questionIndex,
  selectedAnswers,
}) {
  console.log(question);
  console.log(question)

  const [selectedByUser, setSelectedByUser] = useState([])

  const handleSelectedAnswer = (shuffledAnswer) => {
    setSelectedByUser(shuffledAnswer)

    console.log(shuffledAnswer)
  }

  return (
    <div className="question-item">
      <h2>{question.question}</h2>
      {question.shuffled_answers.map(shuffledAnswer => (
        <button className={shuffledAnswer === selectedByUser ? 'selected' : ''} onClick={() => handleSelectedAnswer(shuffledAnswer)}>{shuffledAnswer}</button>
      ))}

      {/* <form className="question-form">
      {question.answers.map((item, index) => (
          <li key={index} className={`list-item ${selectedAnswers[questionIndex] === item ? 'checked' : ''}`}>
              <label>
                  <input
                    type="radio"
                    name="answer"
                    value={item}
                    onClick={()=> handleSelectedItem(item, questionIndex)}
                  />
                 {item}
              </label>
          </li>
      ))}
      </form> */}
    </div>
  );
}
