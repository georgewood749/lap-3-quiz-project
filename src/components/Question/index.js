import React, { useEffect, useState } from "react";

export default function Question(questionDetails) {
    const { question, category, difficulty, correct_answer, incorrect_answers } = questionDetails
    const [answerArray, setAnswerArray] = useState([])
    const [player1Answer, setPlayer1Answer] = useState("")
    const [player2Answer, setPlayer2Answer] = useState("")
    const [finished, setFinished] = useState(false)
    const [playing, setPlaying] = useState(1)
    const [timer, setTimer] = useState(10)

    useEffect(() => {
        let answerArray = [];

        for (let i = answerArray.length - 1; i >= 1; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = answerArray[i];
            answerArray[i] = answerArray[j];
            answerArray[j] = temp;
        }
        setAnswerArray(answerArray);

        function countdown() {
            setTimer(prev => prev - 1)
        }
        const timer = setInterval(() => countdown(), 1000)
        return () => clearInterval(timer)
    }, [question]);

    return (
        <div>
            <div id='gameHeader'>
                <div id='player'>

                </div>
                <div id='turn'>

                </div>
                <div id='timer'>

                </div>
            </div>
            <div id='question'>
                {question}
            </div>
            <div id="progressBar">
                <div id="progress"></div>
            </div>
            <div id='answerBox'>
                <form id='answerForm'>

                    <input type='radio' name='answer' value={1} id='a1'></input>
                    <label htmlFor="a1">
                        <div id="answer1">
                            {answerArray[0]}
                        </div>
                    </label>

                    <input type='radio' name='answer' value={2} id='a2'></input>
                    <label htmlFor="a2">
                        <div id="answer2">
                        {answerArray[1]}
                        </div>
                    </label>

                    <input type='radio' name='answer' value={3} id='a3'></input>
                    <label htmlFor="a3">
                        <div id="answer3">
                        {answerArray[2]}
                        </div>
                    </label>

                    <input type='radio' name='answer' value={4} id='a4'></input>
                    <label htmlFor="a4">
                        <div id="answer4">
                        {answerArray[3]}
                        </div>
                    </label>

                    <input type='submit' value='Submit'></input>

                </form>
                <div id='otherPlayer' className='hide'><div> is playing...</div></div>
            </div>
        </div>
    )
}


