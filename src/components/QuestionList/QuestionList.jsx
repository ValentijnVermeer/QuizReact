import QuestionItem from "../QuestionItem/QuestionItem.jsx";
import { useState, useEffect } from "react";
import "./QuestionList.css";
import AnswerList from "../AnswerList/AnswerList.jsx";
import axios from "axios";

export default function QuestionList() {
  const [toggleAnswers, setToggleAnswers] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

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
        const updatedQuestions = res.data.results.map((question) => {
          const unescapedQuestion = unEscape(question.question);
          const unescapedCorrectAnswer = unEscape(question.correct_answer);
          const unescapedIncorrectAnswers =
            question.incorrect_answers.map(unEscape);

          const shuffledAnswers = shuffleAnswers(
            question.correct_answer,
            question.incorrect_answers
          );
          return {
            ...question,
            question: unescapedQuestion,
            correct_answer: unescapedCorrectAnswer,
            incorrect_answers: unescapedIncorrectAnswers,
            shuffled_answers: shuffledAnswers,
          };
        });
        // Code shuffleAnswers

        setQuizQuestions(updatedQuestions);
        console.log(res.data.results);
      })
      .catch((e) => console.log(e));
  }, []);

  // const addQuestionWithUserAnswer = (copyOfQuestionWithUserAnswer) => {
  //   if (
  //     questionsWithAnswers.find(
  //       (q) => q.question === copyOfQuestionWithUserAnswer.question
  //     )
  //   ) {
  //     setQuestionsWithAnswers(
  //       questionsWithAnswers.map((item) => {
  //         if (item.question === copyOfQuestionWithUserAnswer.question) {
  //           return copyOfQuestionWithUserAnswer;
  //         } else {
  //           return item;
  //         }
  //       })
  //     );
  //   } else {
  //     setQuestionsWithAnswers((prevQuestions) => [
  //       ...prevQuestions,
  //       copyOfQuestionWithUserAnswer,
  //     ]);
  //   }
  // };

  
const addQuestionWithUserAnswer = (copyOfQuestionWithUserAnswer) => {
  const updatedQuestions = [...questionsWithAnswers];

  const existingQuestionIndex = updatedQuestions.findIndex(
    (q) => q.question === copyOfQuestionWithUserAnswer.question
  );

  if (existingQuestionIndex !== -1) {
    updatedQuestions[existingQuestionIndex] = copyOfQuestionWithUserAnswer;
  } else {
    updatedQuestions.push(copyOfQuestionWithUserAnswer);
  }

  setQuestionsWithAnswers(updatedQuestions);
};

  // const addQuestionWithUserAnswer = (copyOfQuestionWithUserAnswer) => {
  //   questionsWithAnswers.map(item => {
  //     if(item.question === copyOfQuestionWithUserAnswer.question) {
  //       item.user_answer = copyOfQuestionWithUserAnswer.user_answer;
  //     } else {setQuestionsWithAnswers(prevQuestions => [...prevQuestions, copyOfQuestionWithUserAnswer]);}
  //   })
  //   console.log(questionsWithAnswers)
  // };

  const handleToggleAnswers = () => {
    questionsWithAnswers.forEach((obj) => {
      if (obj.user_answer === obj.correct_answer) {
        setScore((prevScore) => prevScore + 1);
      }
    });
    setToggleAnswers(true);
  };

  const handlePrevious = () => {
    setQuestionIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(quizQuestions, 'quizQuestions');
    console.log(quizQuestions[questionIndex], 'qQ with index');

  }, [questionsWithAnswers]);

  return (
    <div className="question-list">
      <h1>Test Question List</h1>
      {quizQuestions.length > 0  && !toggleAnswers && (
        <QuestionItem
          question={quizQuestions[questionIndex]}
          key={questionIndex}
          questionIndex={questionIndex}
          addQuestionWithUserAnswer={addQuestionWithUserAnswer}
          questionsWithAnswers={questionsWithAnswers}
        />
      )}
       <button onClick={handlePrevious} disabled={questionIndex === 0}>Previous</button>
          <button onClick={handleNext} disabled={questionIndex === quizQuestions.length - 1}>Next</button>
      {!toggleAnswers && (
        <button
          className="submit-button"
          disabled={
            quizQuestions.length != questionsWithAnswers.length ? true : false
          }
          onClick={handleToggleAnswers}
        >
          Submit
        </button>
      )}
      {toggleAnswers && (
        <AnswerList
          questions={quizQuestions}
          questionsWithAnswers={questionsWithAnswers}
          score={score}
        />
      )}
    </div>
  );
}
