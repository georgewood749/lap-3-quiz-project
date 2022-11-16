import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Question, Timer } from '../../components';

export default function OfflineGame() {
    const location = useLocation()
    const navigate = useNavigate()
    const [questionDetails, setQuestionDetails] = useState([])
    const [question, setQuestion] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [incorrectAnswers, setIncorrectAnswers] = useState([])
    const [answerArray, setAnswerArray] = useState([])
    const [player1Answer, setPlayer1Answer] = useState("");
    const [player2Answer, setPlayer2Answer] = useState("");
    const [playing, setPlaying] = useState(1)
    const [questionNumber, setQuestionNumber] = useState(1)
    const [timer, setTimer] = useState(10)
    const [finished, setFinished] = useState(false)

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
            // const questions = questionsArray.map(question => question.question)
            // const correctAnswers = questionsArray.map(question => question.correct_answer)
            // const incorrectAnswers = questionsArray.map(question => question.incorrect_answers)
            // setQuestions(questions[0])
            // setCorrectAnswer(correctAnswers[0])
            // setIncorrectAnswers(incorrectAnswers[0])
            // return questionsArray;
        } catch (err) {
            throw new Error(err.message)
        }
    }

    // comes up as undefined for first few seconds, throwing errors regarding index of undefined
    console.log(questionDetails[0])




    const handleSubmit = (e) => {

    }

    useEffect(() => {
        if (!!questionDetails[0]) {
            setCorrectAnswer(questionDetails[0].correct_answer)
            setIncorrectAnswers(questionDetails[0].incorrect_answers)
            setQuestion(questionDetails[0].question)
            let answerArray = [];
            // answerArray.push(he.decode(correctAnswer), he.decode(incorrectAnswers[0]), he.decode(incorrectAnswers[1]), he.decode(incorrectAnswers[2]));
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
                // questions.shift()
                // incorrectAnswers.shift()
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
            </div>
        </div>
    )
}
