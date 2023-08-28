import Button from '@mui/material/Button';

import { useQuestionStore } from './store/question';

const LIMIT_QUESTION = 2
export const Start = () => {
    const fetchQuestion = useQuestionStore((state) => state.fetchQuestions)
  const handleQuestion = () => {
    fetchQuestion(LIMIT_QUESTION)
  }
return (
    <Button onClick={handleQuestion}>Start</Button>
  )
}

