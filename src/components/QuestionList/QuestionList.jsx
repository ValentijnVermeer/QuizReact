import QuestionItem from "../QuestionItem/QuestionItem.jsx";
import questions from "../questions.jsx";
import { useState, useEffect } from "react";
import "./QuestionList.css";
import AnswerList from "../AnswerList/AnswerList.jsx";
import axios from "axios";

export default function QuestionList() {

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [toggleAnswers, setToggleAnswers] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState([]);

  const handleSelectedItem = (item, index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = item;
    setSelectedAnswers(updatedAnswers);
  };



  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
      )
      .then((res) => {
        // Code shuffleAnswers
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
        const updatedQuestions = res.data.results.map(question => {
        const unescapedQuestion = unEscape(question.question);
        const unescapedCorrectAnswer = unEscape(question.correct_answer);
        const unescapedIncorrectAnswers = question.incorrect_answers.map(unEscape);

        const shuffledAnswers = shuffleAnswers(
          question.correct_answer,
          question.incorrect_answers
        );
        return {
          ...question,
          question: unescapedQuestion,
          correct_answer: unescapedCorrectAnswer,
          incorrect_answers: unescapedIncorrectAnswers,
          shuffled_answers: shuffledAnswers 
        };
      
      })
        // Code shuffleAnswers

        setQuizQuestions(updatedQuestions);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="question-list">
      <h1>Test Question List</h1>
      {!toggleAnswers &&
        quizQuestions.map((question, index) => (
          <QuestionItem
            question={question}
            key={index}
            handleSelectedItem={handleSelectedItem}
            questionIndex={index}
            selectedAnswers={selectedAnswers}
          />
        ))}
      {!toggleAnswers && (
        <button
          className="submit-button"
          disabled={selectedAnswers.length != questions.length ? true : false}
          onClick={() => setToggleAnswers(true)}
        >
          Submit
        </button>
      )}
      {toggleAnswers && (
        <AnswerList selectedAnswers={selectedAnswers} questions={questions} />
      )}
    </div>
  );
}
