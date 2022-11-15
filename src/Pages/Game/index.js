import React from 'react'

export default function Game() {

    const player = 'xxx'
    const myTurn = true
    const turn = myTurn ? 'Your turn' : 'Wait'
    const timer = '15s'
    const otherPlayer = 'X'

    return (
        <div>
            <div id='gameHeader'>
                <div id='player'>
                    {player}
                </div>
                <div id='turn'>
                    {turn}
                </div>
                <div id='timer'>
                    {timer}
                </div>
            </div>
            <div id='question'>
                Question
            </div>
            <div id="progressBar">
                <div id="progress"></div>
            </div>
            <div id='answerBox'>
                <form id='answerForm'>

                    <input type='radio' name='answer' value={1} id='a1'></input>
                    <label for="a1">
                    <div id="answer1">
                        a. answer 1
                    </div>
                    </label>

                    <input type='radio' name='answer' value={2} id='a2'></input>
                    <label for="a2">
                    <div id="answer2">
                        b. answer 2
                    </div>
                    </label>

                    <input type='radio' name='answer' value={3} id='a3'></input>
                    <label for="a3">
                    <div id="answer3">
                        c. answer 3
                    </div>
                    </label>

                    <input type='radio' name='answer' value={4} id='a4'></input>
                    <label for="a4">
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
