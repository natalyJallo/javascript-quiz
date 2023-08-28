
import { useQuestionStore } from "../store/question";
import { Question } from "../types";
export const useQuestionData = () => {
    const questions = useQuestionStore(state => state.questions);
    const reset = useQuestionStore(state => state.reset);


    let correct = 0;
    let incorrect = 0
    let unanswered = 0
    questions.forEach((question: Question) => {
        const {userSelectedAnswer, correctAnswer} = question;
        if(userSelectedAnswer == null) unanswered++;
        else if(correctAnswer == userSelectedAnswer) correct++;
        else incorrect++;
    });

    return {correct, incorrect, unanswered, reset}
}