import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';


export default function Game() {

    const qa = useSelector(state => state.socket.qa);
    const username = useSelector(state => state.socket.user.username);

    const [ content, setContent] = useState({ question: "Question", answer: [ "" ] })
    
    useEffect(() => {
        setContent({ 
            question: qa.contents[0].question, 
            // answer: qa.contents[0].incorrect_answers.splice((Math.floor(Math.random() * (qa.contents[0].incorrect_answers.length + 1))), 0, qa.contents[0].correct_answer)
        })
    },[])

    

    const myTurn = true
    const turn = myTurn ? 'Your turn' : 'Wait'
    const timer = '15s'
    const otherPlayer = 'X'

    return (
        <div>
            <div id='gameHeader'>
                <div id='player'>
                    {username}
                </div>
                <div id='turn'>
                    {turn}
                </div>
                <div id='timer'>
                    {timer}
                </div>
            </div>
            <div id='question'>
                {/* Question */}
                {content.question}
            </div>
            <div id="progressBar">
                <div id="progress"></div>
            </div>
            <div id='answerBox'>
                <form id='answerForm'>

                    <input type='radio' name='answer' value={1} id='a1'></input>
                    <label htmlFor="a1">
                    <div id="answer1">
                        a. answer 1
                    </div>
                    </label>

                    <input type='radio' name='answer' value={2} id='a2'></input>
                    <label htmlFor="a2">
                    <div id="answer2">
                        b. answer 2
                    </div>
                    </label>

                    <input type='radio' name='answer' value={3} id='a3'></input>
                    <label htmlFor="a3">
                    <div id="answer3">
                        c. answer 3
                    </div>
                    </label>

                    <input type='radio' name='answer' value={4} id='a4'></input>
                    <label htmlFor="a4">
                    <div id="answer4">
                        d. answer 4
                    </div>
                    </label>

                    <input type='submit' value='Submit'></input>

                </form>
                <div id='otherPlayer' className='hide'><div>{otherPlayer} is playing...</div></div>
            </div>
        </div>
    )
}
