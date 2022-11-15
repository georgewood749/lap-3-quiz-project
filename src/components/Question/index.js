import React, { useEffect, useState } from "react";
import { useDispatch, useRef, useSelector } from 'react-redux'
import { addPoints, nextQuestion } from "../../actions";

const time = 10;

export default function Question(questionNum, questionDetails) {
    const dispatch = useDispatch()
    const timerRef = useRef()
    const socket = useSelector((state) => state.socket)
    const quiz = useSelector((state) => state.quiz)
    const user = useSelector((state) => state.user)
    const { question, correct_answer, incorrect_answers } = questionDetails
    const [playerAnswer, setPlayerAnswer] = useState("")
    const [timer, setTimer] = useState(time)
    const [finished, setFinished] = useState(false)
    return (
        <div>

        </div>
    )
}


