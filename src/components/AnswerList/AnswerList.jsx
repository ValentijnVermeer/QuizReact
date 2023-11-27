export default function AnswerList({ selectedAnswers, questions }) {
    console.log(selectedAnswers);
    return (
        <>
            {questions.map((item, index) => (
                <div key={index}>
                    <h2>{item.question}</h2>
                    <h3>{selectedAnswers[index]}</h3>
                </div>
            ))}
        </>
    );
}

