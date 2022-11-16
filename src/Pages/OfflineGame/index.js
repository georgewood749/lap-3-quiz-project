import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Question, Timer } from '../../components';
var he = require('he')


export default function OfflineGame() {
    const location = useLocation()
    const [questionDetails, setQuestionDetails] = useState([])
    const [question, setQuestion] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [incorrectAnswers, setIncorrectAnswers] = useState([])
    const [answerArray, setAnswerArray] = useState([])
    const [player1Answer, setPlayer1Answer] = useState("");
    const [player2Answer, setPlayer2Answer] = useState("");
    const [playing, setPlaying] = useState(1)
    // const [questionNum, setQuestionNum] = useState()
    let questionNumber = question.length
    const [timer, setTimer] = useState(10)
    const [finished, setFinished] = useState(false)


    useEffect(() => {
        fetchQuestions(location.state.category, location.state.numQuestions, location.state.difficulty)
    }, [])


    const player = `Player ${playing} turn`
    const myTurn = true
    // const turn = myTurn ? 'Your turn' : 'Wait'
    // let timer = 10
    const otherPlayer = 'X'

    const fetchQuestions = async (category, numQuestions, difficulty, type) => {
        try {
            const { data } = await axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`)
            const questionsArray = data.results
            const questions = questionsArray.map(question => question.question)
            const correctAnswers = questionsArray.map(question => question.correct_answer)
            const incorrectAnswers = questionsArray.map(question => question.incorrect_answers)
            setQuestionDetails(questionsArray)
            setQuestion(questions)
            setCorrectAnswer(correctAnswers[0])
            setIncorrectAnswers(incorrectAnswers[0])

            // return questionsArray;
        } catch (err) {
            throw new Error(err.message)
        }
    }

    useEffect(() => {
        let answerArray = [];
        // answerArray.push(he.decode(correctAnswer), he.decode(incorrectAnswers[0]), he.decode(incorrectAnswers[1]), he.decode(incorrectAnswers[2]));
        answerArray.push(correctAnswer, incorrectAnswers[0], incorrectAnswers[1], incorrectAnswers[2])

        for (let i = answerArray.length - 1; i >= 1; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let tempItem = answerArray[i];
            answerArray[i] = answerArray[j];
            answerArray[j] = tempItem;
        }
        setAnswerArray(answerArray);

        function countdown() {
            setTimer(prev => prev - 1)
        }
        const timer = setInterval(() => countdown(), 1000)
        return () => clearInterval(timer)
    }, [question]);

    useEffect(() => {
        if (timer < 1) {
            if (questionNumber <= location.state.numQuestions) {
                questionNumber ++
                // questionDetails.shift()
                question.shift()
                // correctAnswer.shift()
                incorrectAnswers.shift()
                setTimer(10);
            } else {
                setFinished(true);
            }
        }
        // setTimer(10)
    }, [timer])

    return (
        // <div>
        //     <Question questionNum={questionNumber} questionDetails={questionDetails[questionNumber - 1]} />
        // </div>
        <div>
            <div id='gameHeader'>
                <div id='player'>
                    {player}
                </div>
                {/* <div id='turn'>
                    {turn}
                </div> */}
                <div id='timer'>
                    {timer}
                </div>
            </div>
            <div id='question'>
                {question[0]}
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
                <div id='otherPlayer' className='hide'><div>{otherPlayer} is playing...</div></div>
            </div>
        </div>
    )
}
