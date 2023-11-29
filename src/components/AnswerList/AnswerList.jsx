export default function AnswerList({ questionsWithAnswers, score }) {

    return (
        <>
            {questionsWithAnswers.map((item, index) => (
                <div key={index}>
                <h2>{item.question}</h2>
                <h3>{`Your answer: ${item.user_answer}`}</h3>
                <h3>{`Correct answer: ${item.correct_answer}`}</h3>
                
                </div>
            ))}
            <h3>{`Your score: ${score}`}</h3>
            {score === 10 && <h3>Great job</h3>}
        </>
    );
}

