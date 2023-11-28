import "./QuestionItem.css";
import { useState } from "react";

export default function QuestionItem({
  question,
  handleSelectedItem,
  questionIndex,
  selectedAnswers,
  addQuestionWithUserAnswer
}) {
  // console.log(question);

  const [selectedByUser, setSelectedByUser] = useState("");

  const handleSelectedAnswer = (shuffledAnswer) => {
    setSelectedByUser(shuffledAnswer);
    const copyOfQuestionWithUserAnswer = {...question, user_answer: shuffledAnswer}
    console.log(question)
    console.log(copyOfQuestionWithUserAnswer)
    addQuestionWithUserAnswer(copyOfQuestionWithUserAnswer)
  };

  return (
    <div className="question-item">
      <h2>{question.question}</h2>
      {question.shuffled_answers.map((shuffledAnswer, index) => (
        <button
          key={index}
          className={shuffledAnswer === selectedByUser ? "selected" : ""}
          onClick={() => handleSelectedAnswer(shuffledAnswer)}
        >
          {shuffledAnswer}
        </button>
      ))}
    </div>
  );
}
