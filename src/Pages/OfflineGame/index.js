import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Question } from '../../components';

export default function OfflineGame() {
    const location = useLocation()
    const navigate = useNavigate()

    const [questionDetails, setQuestionDetails] = useState([])
    const [question, setQuestion] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [incorrectAnswers, setIncorrectAnswers] = useState([])
    const [answerArray, setAnswerArray] = useState([])

    const [playing, setPlaying] = useState(1)
    const [questionNumber, setQuestionNumber] = useState(1)
    const [timer, setTimer] = useState(10)
    const [finished, setFinished] = useState(false)

    const [player1Answer, setPlayer1Answer] = useState("");
    const [player2Answer, setPlayer2Answer] = useState("");
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)

    function decodeHtml(text) {
        var txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }

    useEffect(() => {
        fetchQuestions(location.state.category, location.state.numQuestions, location.state.difficulty)
    }, [])


    const player = `Player ${playing} turn`
    // const myTurn = true
    // const turn = myTurn ? 'Your turn' : 'Wait'
    // let timer = 10
    // const otherPlayer = 'X'

    const fetchQuestions = async (category, numQuestions, difficulty) => {
        try {
            const { data } = await axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`)
            const questionsArray = data.results
            setQuestionDetails(questionsArray)
        } catch (err) {
            throw new Error(err.message)
        }
    }

    function handleSubmit(e) {
        const selected = e.target.textContent;
        if (selected === correctAnswer && questionNumber <= 10) {
            setPlayer1Score(prev => prev + 1)
        }
        setPlayer1Answer(selected);
        if (questionNumber <= location.state.numQuestions) {
            setQuestionNumber(prev => prev + 1)
            questionDetails.shift()
            setTimer(10);
        } else {
            setFinished(true);
            navigate('./results')
        }
    }

    useEffect(() => {
        if (questionDetails[0]) {
            setCorrectAnswer(questionDetails[0].correct_answer)
            setIncorrectAnswers(questionDetails[0].incorrect_answers)
            setQuestion(questionDetails[0].question)

            let answerArray = [];
            answerArray.push(decodeHtml(correctAnswer), decodeHtml(incorrectAnswers[0]), decodeHtml(incorrectAnswers[1]), decodeHtml(incorrectAnswers[2]))

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
        }
    }, [questionDetails[0], question]);

    useEffect(() => {
        if (timer < 1) {
            if (questionNumber <= location.state.numQuestions) {
                setQuestionNumber(prev => prev + 1)
                questionDetails.shift()
                setTimer(10);
            } else {
                setFinished(true);
                // navigate('/results')
            }
        }
        // setTimer(10)
    }, [timer])

    return (
        // <div>
        //     <Question questionDetails={questionDetails} />
        // </div>
        <div>
            <div id='gameHeader'>
                <div id='player'>
                    {player}
                </div>
                <div id='turn'>
                    {`Question ${questionNumber}/${location.state.numQuestions}`}
                </div>
                <div id='timer'>
                    {timer}
                </div>
            </div>
            <div id='question'>
                {decodeHtml(question)}
            </div>
            <div id="progressBar">
                <div id="progress"></div>
            </div>
            <div id='answerBox'>

                <div id="answer1" onClick={handleSubmit} >
                    {answerArray[0]}
                </div>

                <div id="answer2" onClick={handleSubmit} >
                    {answerArray[1]}
                </div>

                <div id="answer3" onClick={handleSubmit} >
                    {answerArray[2]}
                </div>

                <div id="answer4" onClick={handleSubmit} >
                    {answerArray[3]}
                </div>

                {/* <form id='answerForm'>

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

                </form> */}
            </div>
        </div>
    )
}
