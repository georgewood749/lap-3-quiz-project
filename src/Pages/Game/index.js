import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { store_answers } from '../../actions/socket/socketSlice';


export default function Game() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const qa = useSelector(state => state.socket.qa);
    const username = useSelector(state => state.socket.user.username);
    const scores = useSelector(state => state.socket.user.scores);
    const socket = useSelector(state => state.socket.socket);

    const [ content, setContent] = useState({ question: "Question", answers: [ "" ] })
    const [ answer, setAnswer ] = useState("")
    const [ nQsAnsed, setNQsAnsed] = useState(0)

    function mixAns(incorrect_answers, correct_answer){
        let ranIdx = Math.floor(Math.random() * (incorrect_answers.length + 1))
        let mixed_answers = incorrect_answers.map(a => a);
        mixed_answers.splice(ranIdx, 0, correct_answer)
        return mixed_answers
    }
    
    useEffect(() => {
        setContent({ 
            question: qa.contents[nQsAnsed].question, 
            answers: mixAns(qa.contents[nQsAnsed].incorrect_answers, qa.contents[nQsAnsed].correct_answer)
        })
    }, [nQsAnsed])

    const handleChange = (e) => {
        if(e.target.checked) {
            setAnswer(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${nQsAnsed}/${qa.settings.amount} : ${answer}`);
        dispatch(store_answers({questionNo: nQsAnsed, answer: answer}))
        qa.settings.amount === (nQsAnsed + 1)?  submitAnswers() : setNQsAnsed(prev => prev + 1);
    }

    function submitAnswers(){
        setNQsAnsed(prev => prev = 0) // Loop back for Dev
        // socket.emit('submit-results', username, scores)
        // navigate('/results');
    }

    

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
                <form id='answerForm' onSubmit={handleSubmit}>

                    <input type='radio' name='answer' value={content.answers[0]} checked={answer === content.answers[0]} onChange={handleChange} id='a1'></input>
                    <label htmlFor="a1">
                    <div id="answer1">
                        {/* a. answer 1 */}
                        {content.answers[0]}
                    </div>
                    </label>

                    <input type='radio' name='answer' value={content.answers[1]} checked={answer === content.answers[1]} onChange={handleChange} id='a2'></input>
                    <label htmlFor="a2">
                    <div id="answer2">
                        {/* b. answer 2 */}
                        {content.answers[1]}
                    </div>
                    </label>

                    <input type='radio' name='answer' value={content.answers[2]} checked={answer === content.answers[2]} onChange={handleChange} id='a3'></input>
                    <label htmlFor="a3">
                    <div id="answer3">
                        {/* c. answer 3 */}
                        {content.answers[2]}
                    </div>
                    </label>

                    <input type='radio' name='answer' value={content.answers[3]} checked={answer === content.answers[3]} onChange={handleChange} id='a4'></input>
                    <label htmlFor="a4">
                    <div id="answer4">
                        {/* d. answer 4 */}
                        {content.answers[3]}
                    </div>
                    </label>

                    <input type='submit' value='Submit' />

                </form>
                <div id='otherPlayer' className='hide'><div>{otherPlayer} is playing...</div></div>
            </div>
        </div>
    )
}
