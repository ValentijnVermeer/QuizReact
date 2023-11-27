import './QuestionItem.css'


export default function QuestionItem({question, handleSelectedItem, questionIndex, selectedAnswers}) {
  console.log(question);
  return (
    <div className="question-item">
      <h2>{question.question}</h2>
      <form className="question-form">
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
      </form>
    </div>
  );
}
