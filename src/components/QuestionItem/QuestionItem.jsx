import 'bootstrap/dist/css/bootstrap.min.css';
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
    <div className="question-item card text-center">
      <div className="card-header">
        <h2>{question.question}</h2>
      </div>
      <div className="card-body">
        {question.shuffled_answers.map((shuffledAnswer, index) => (
          <button
            key={index}
            className={`btn ${shuffledAnswer === selectedByUser ? "btn-primary neon-button" : "btn-outline-primary neon-button-outline"} m-2`}
            onClick={() => handleSelectedAnswer(shuffledAnswer)}
          >
            {shuffledAnswer}
          </button>
        ))}
      </div>
    </div>
  );
}