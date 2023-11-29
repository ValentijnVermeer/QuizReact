import 'bootstrap/dist/css/bootstrap.min.css';
import "./AnswerList.css";

export default function AnswerList({ questionsWithAnswers, score }) {
    return (
        <div className="container mt-5 bg-dark text-white">
        {questionsWithAnswers.map((item, index) => (
          <div key={index} className="card mb-3 bg-dark text-white">
            <div className="card-header neon-blue-text">
              <h2>{item.question}</h2>
            </div>
            <div className="card-body">
              <h5 className={`card-title neon-text ${item.user_answer === item.correct_answer ? 'text-success' : 'text-danger'}`}>
                Your answer: {item.user_answer}
              </h5>
              <h5 className="card-title neon-pink-text">Correct answer: {item.correct_answer}</h5>
            </div>
          </div>
        ))}
    <div className="alert alert-primary neon-text" role="alert">
      Your score: {score} / {questionsWithAnswers.length}
    </div>
    {score === 10 && <div className="alert alert-success neon-text" role="alert">Great job</div>}
  </div>
      );
}