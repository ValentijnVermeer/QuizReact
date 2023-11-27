import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import QuestionList from './components/QuestionList/QuestionList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QuestionList />
    </>
  )
}

export default App
