import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
    const { id, question, options, selectedOption, isAnswered, correctAnswer, handleOptionSelect } = props;

    const getStyle = (option) => {
        if (isAnswered) {
            if (option === correctAnswer) {
                return { backgroundColor: "#94D7A2" };
            } else if (option === selectedOption && selectedOption !== correctAnswer) {
                return { backgroundColor: "#F8BCBC" };
            }
        } else if (option === selectedOption) {
            return { backgroundColor: "#D6DBF5" };
        }
        return {};
    };

    const newOptions = options.map((option) => {
        const optionId = nanoid();
        return (
            <div
                key={optionId}
                className="answer"
                onClick={() => handleOptionSelect(id, option)}
                style={getStyle(option)}
            >
                <input
                    type="radio"
                    value={option}
                    id={optionId}
                    name={id}
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(id, option)}
                />
                <label htmlFor={optionId}>{option}</label>
            </div>
        );
    });

    return (
        <div className="question">
            <h3>{question}</h3>
            <div className="answer-container">{newOptions}</div>
            <hr />
        </div>
    );
}
