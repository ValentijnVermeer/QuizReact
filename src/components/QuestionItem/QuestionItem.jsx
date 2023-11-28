import "./QuestionItem.css";

export default function QuestionItem({
  question,
  handleSelectedItem,
  questionIndex,
  selectedAnswers,
}) {
  console.log(question);

  const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    // Fisher-Yates shuffle algorithm
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }

    return allAnswers;
  };

  function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#039;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");

    return htmlStr;
  }

  question.question = unEscape(question.question);
  question.correct_answer = unEscape(question.correct_answer);
  question.incorrect_answers = question.incorrect_answers.map(unEscape);

  question.shuffled_answers = shuffleAnswers(
    question.correct_answer,
    question.incorrect_answers
  );

  console.log(question)

  const handleSelectedAnswer = (shuffledAnswer) => {

    console.log(shuffledAnswer)
  }

  return (
    <div className="question-item">
      <h2>{question.question}</h2>
      {question.shuffled_answers.map(shuffledAnswer => (
        <button onClick={() => handleSelectedAnswer(shuffledAnswer)}>{shuffledAnswer}</button>
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
