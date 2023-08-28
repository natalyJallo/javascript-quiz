import { create } from "zustand";
import confetti from 'canvas-confetti'
import { persist, devtools } from "zustand/middleware";

import { Question } from "../types";

const API_URL = import.meta.env.DEV ? 'http://127.0.0.1:5173' : '';

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
    reset: () => void
  }
export const useQuestionStore = create<State>()(devtools(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: null,
    fetchQuestions: async (limit: number) => {
    const result = await fetch(`${API_URL}/data.json`);
    const resultQuestion = await result.json();
    const questions = resultQuestion.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions }, false, 'FETCH_QUESTIONS')
    },
    selectAnswer: (questionId, answerId) => {
      const { questions } = get();
      const newQuestion = structuredClone(questions);
      const selectIndex = newQuestion.findIndex(e => e.id === questionId);
      const questionInfo = questions[selectIndex];
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerId;

      if(isCorrectUserAnswer) confetti()

      newQuestion[selectIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerId,
      }
      set({questions: newQuestion}, false, 'SELECT_ANSWER')
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;

      if(nextQuestion < questions.length) {
        set({currentQuestion: nextQuestion}, false, 'GO_NEXT_QUESTION')
      }
    }, 
    goPreviousQuestion: () => {
      const { currentQuestion} = get();
      const backQuestion = currentQuestion - 1;

      if(backQuestion >= 0) {
        set({currentQuestion: backQuestion}, false, 'GO_PREVIOUS_QUESTION')
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [] }, false, 'RESET')
    }
  }
}, {
  name: 'questions'
})))
