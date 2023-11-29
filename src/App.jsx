import { useState } from 'react';
import './App.css';
import QuestionList from './components/QuestionList/QuestionList';
import FloatingBalls from './components/FloatyBalls';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FloatingBalls />
      <QuestionList />
    </>
  );
}

export default App;