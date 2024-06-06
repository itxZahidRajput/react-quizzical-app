import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { decode } from 'html-entities';
import Question from "./components/Question";
import Start from "./components/Start"

export default function App() {
    const [questions, setQuestions] = useState([]);
    const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
    const [buttonText, setButtonText] = useState("Check Answers");
    const [style, setStyle] = useState({ display: "none" })
    const [start, setStart] = useState(false)

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const res = await fetch("https://opentdb.com/api.php?amount=5");
        const data = await res.json();
        setQuestions(data.results.map(question => ({
            id: nanoid(),
            question: decode(question.question),
            correctAnswer: question.correct_answer,
            options: generateOptions(question.incorrect_answers, question.correct_answer),
            selectedOption: null,
            isAnswered: false,
            isCorrect: null
        })));
        setButtonText("Check Answers");
        setNumCorrectAnswers(0);
        setStyle({
            display: "none"
        })
    };

    function generateOptions(wrongAnswers, correctAnswer) {
        const options = [...wrongAnswers];
        const randomIndex = Math.floor(Math.random() * (options.length + 1));
        options.splice(randomIndex, 0, correctAnswer);
        return options;
    }

    function handleOptionSelect(questionId, selectedOption) {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId ? { ...question, selectedOption } : question
            )
        );
    }

    function checkAnswers() {
        if (buttonText === "Play Again") {
            fetchQuestions();
            return;
        }

        let correctCount = 0;
        const updatedQuestions = questions.map(question => {
            const isCorrect = question.selectedOption === question.correctAnswer;
            if (isCorrect) correctCount++;
            return { ...question, isAnswered: true, isCorrect };
        });

        setQuestions(updatedQuestions);
        setNumCorrectAnswers(correctCount);
        setButtonText("Play Again");
        setStyle({
            display: "block"
        })
    }

    const questionElements = questions.map(question => (
        <Question
            key={question.id}
            id={question.id}
            question={question.question}
            options={question.options}
            selectedOption={question.selectedOption}
            isAnswered={question.isAnswered}
            isCorrect={question.isCorrect}
            correctAnswer={question.correctAnswer}
            handleOptionSelect={handleOptionSelect}
        />
    ));

    return (
        <main>
            {!start ? <Start startQuiz={() => setStart(true)} /> :
                <>
                <form className="container">
                {questionElements}
            </form>
            <div className="submit">
                <h3 style={style}>You scored {numCorrectAnswers}/5 correct answers</h3>
                <button className="btn" type="button" onClick={checkAnswers}>{buttonText}</button>
                        </div>
                        
                        </>
            }
        </main>
    )
}
