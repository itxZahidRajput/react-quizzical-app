import React from "react"

export default function Start(props) {
    return (
        <div className="start-container">
            <h2>Quizzical</h2>
            <p>Quiziccal is an engaging quiz application that tests your knowledge across various topics, offering an interactive experience with dynamic questions and instant feedback</p>
            <button className="btn" onClick={props.startQuiz}>Start Quiz</button>
        </div>
    )
}