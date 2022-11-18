import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

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

    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)

    let player
    if (questionNumber > location.state.numQuestions) {
        player = 'Game over'
    } else {
        player = `Player ${playing} turn`
    }

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
        if (selected === correctAnswer && questionNumber <= location.state.numQuestions) {
            if (playing === 1) {
                setPlayer1Score(prev => prev + 1)
                // setPlaying(2)
            } else {
                setPlayer2Score(prev => prev + 1)
                // setPlaying(1)
            }
        }
        if (questionNumber <= location.state.numQuestions) {
            if (playing === 1) {
                setPlaying(2)
                setTimer(10)
            } else {
                questionDetails.shift()
                setTimer(10);
                setPlaying(1)
                setQuestionNumber(prev => prev + 1)
            }
        } else {
            setFinished(true);
            navigate('/offline_results', { state: { p1: player1Score, p2: player2Score } })
        }
    }

    function decodeHtml(text) {
        var txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }

    useEffect(() => {
        fetchQuestions(location.state.category, location.state.numQuestions, location.state.difficulty)
    }, [])

    useEffect(() => {
        if (finished) {
            navigate('/offline_results', { state: { p1: player1Score, p2: player2Score } });
        }
    }, [finished])

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
                if (playing === 1) {
                    setPlaying(2)
                    setTimer(10)
                } else {
                    questionDetails.shift()
                    setTimer(10);
                    setPlaying(1)
                    setQuestionNumber(prev => prev + 1)
                }
            } else {
                setFinished(true);
                navigate('/offline_results', { state: { p1: player1Score, p2: player2Score } })
            }
        }
    }, [timer])

    let progress = (questionNumber / location.state.numQuestions) * 100
    const customStyle = {
        width: '0%'
    }
    if (progress > 100) {
        progress = 100
    }
    customStyle.width = `${progress}%`

    let quizProgress
    if (questionNumber > location.state.numQuestions) {
        quizProgress = `${location.state.numQuestions}/${location.state.numQuestions}`
    } else {
        // quizProgress = `${questionNumber}/${location.state.numQuestions}`
        quizProgress = `${questionNumber}`
    }

    return (
        <div>
            <div id='gameHeader'>
                <div id='turn'>
                    {`Question ${quizProgress}`}
                </div>
                <div id='timer'>
                    {timer}
                </div>
            </div>
            <div id='player'>
                    {player}
                </div>
            <div id='question'>
                {decodeHtml(question)}
            </div>
            <div id="progressBar">
                <div id="progress" style={customStyle}></div>
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

            </div>
        </div>
    )
}
