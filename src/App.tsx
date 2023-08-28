import "./App.css";
import { Container, Stack, Typography } from "@mui/material";

import { LogoJs } from "./LogoJavascript";
import { Start } from "./Start";
import { Results } from "./Results";
import { Game } from "./Game";

import { useQuestionStore } from "./store/question";
import { useQuestionData } from "./hooks/useQuestionData";

function App() {
  const question = useQuestionStore((state) => state.questions)
  const { unanswered } = useQuestionData()

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <LogoJs />
          <Typography variant="h2" component="h1">
            Vite + React
          </Typography>
        </Stack>
        {question.length === 0 && <Start />}
        {question.length > 0 && <Game />}
        {question.length > 0 && unanswered === 0 && <Results />}
      </Container>
    </main>
  );
}

export default App;
