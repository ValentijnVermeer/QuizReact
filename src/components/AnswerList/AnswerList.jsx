import 'bootstrap/dist/css/bootstrap.min.css';

export default function AnswerList({ questionsWithAnswers, score }) {
    return (
        <div className="container mt-5">
            {questionsWithAnswers.map((item, index) => (
                <div key={index} className="card mb-3">
                    <div className="card-header">
                        <h2>{item.question}</h2>
                    </div>
                    <div className="card-body">
                        <h5 className={`card-title ${item.user_answer === item.correct_answer ? 'text-success' : 'text-danger'}`}>
                            Your answer: {item.user_answer}
                        </h5>
                        <h5 className="card-title">Correct answer: {item.correct_answer}</h5>
                    </div>
                </div>
            ))}
            <div className="alert alert-primary" role="alert">
                Your score: {score} / {questionsWithAnswers.length}
            </div>
            {score === 10 && <div className="alert alert-success" role="alert">Great job</div>}
        </div>
    );
}