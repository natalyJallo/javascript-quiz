export const getQuestions = async () => {
    const result = await fetch('http://127.0.0.1:5173/data.json');
    const resultQuestion = await result.json();
    return resultQuestion;
}