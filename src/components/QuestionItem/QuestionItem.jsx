import "./QuestionItem.css";
import { useState } from "react";

export default function QuestionItem({
  question,
  addQuestionWithUserAnswer,
  questionsWithAnswers,
}) 
{
const initialSelectedAnswer = questionsWithAnswers.find(
  (q) => q.question === question.question
)?.user_answer || '';

const [selectedByUser, setSelectedByUser] = useState(initialSelectedAnswer);

  const handleSelectedAnswer = (shuffledAnswer) => {
    setSelectedByUser(shuffledAnswer);
    const copyOfQuestionWithUserAnswer = {
      ...question,
      user_answer: shuffledAnswer,
    };
    console.log(question);
    console.log(copyOfQuestionWithUserAnswer);
    addQuestionWithUserAnswer(copyOfQuestionWithUserAnswer);
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
