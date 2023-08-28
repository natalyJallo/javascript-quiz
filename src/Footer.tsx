import Button from '@mui/material/Button';

import { useQuestionData } from './hooks/useQuestionData';

export const Footer = () => {
    const {correct, incorrect, unanswered, reset} = useQuestionData();

  return (
    <footer style={{marginTop: '16px'}}>
        <strong>{`${correct} correctas -  ${incorrect} - incorrectas - ${unanswered} sin responder`}</strong>
        <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          Resetear juego
        </Button>
      </div>
    </footer>
  )
}
