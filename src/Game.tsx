import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

import { Footer } from "./Footer";

import { useQuestionStore } from "./store/question";
import { Question } from "./types";
const getBackgroundColor = (info: Question, index: number) => () => {
  const { userSelectedAnswer, correctAnswer } = info;
  if (userSelectedAnswer === null) return "transparent";
  if (index !== correctAnswer && index !== userSelectedAnswer) return "transparent";
  if (index === correctAnswer && userSelectedAnswer !== undefined) return "green"; 
  if (index === userSelectedAnswer) return "red";
  return "transparent";
};
const QuestionCard = ({ questionType }: { questionType: Question }) => {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer);

  const handleSelectAnswer = (answerId: number) => () => {
    selectAnswer(questionType.id, answerId );
  };
  return (
    <Card variant="outlined" sx={{ bgcolor: "#222", p: 2, textAlign: "left" }}>
      <Typography>{questionType.question}</Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {questionType.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#333" }} disablePadding>
        {questionType.answers.map((item, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
            disabled={questionType.userSelectedAnswer != null}
              onClick={handleSelectAnswer(index)}
              sx={{ backgroundColor: getBackgroundColor(questionType, index) }}
            >
              <ListItemText primary={item} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const question = useQuestionStore((state) => state.questions);
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionStore(
    (state) => state.goPreviousQuestion
  );

  const questionInfo = question[currentQuestion];

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
          
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {question.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= question.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <QuestionCard questionType={questionInfo} />
      <Footer />
    </>
  );
};

