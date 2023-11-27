import QuestionItem from "../QuestionItem/QuestionItem.jsx";
import questions from "../questions.jsx";
import { useState, useEffect } from "react";
import "./QuestionList.css";
import AnswerList from "../AnswerList/AnswerList.jsx";

export default function QuestionList() {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [toggleAnswers, setToggleAnswers] = useState(false);
  const handleSelectedItem = (item, index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = item;
    setSelectedAnswers(updatedAnswers);
  };

  // async function fetchData(){
  //   try{
  //     const response = await fetch ('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple')
  //     const data = await response.json();
  //     console.log(data);
  //     return data;
  //   }catch(err){
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [])

  return (
    <div className="question-list">
      <h1>Test Question List</h1>
      {!toggleAnswers && questions.map((question, index) => (
        <QuestionItem
          question={question}
          key={index}
          handleSelectedItem={handleSelectedItem}
          questionIndex={index}
          selectedAnswers={selectedAnswers}
        />
      ))}
      {!toggleAnswers && <button
        className="submit-button"
        disabled={selectedAnswers.length != questions.length ? true : false}
        onClick={() => setToggleAnswers(true)}
      >
        Submit
      </button>}
      {toggleAnswers && <AnswerList selectedAnswers={selectedAnswers} questions={questions} />}
    </div>
  );
}
