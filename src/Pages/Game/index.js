import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//* Redux
import { useSelector, useDispatch } from 'react-redux';
import { store_answers, sync_socres } from '../../actions/socket/socketSlice';

export default function Game() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const qa = useSelector(state => state.socket.qa);
    const user = useSelector(state => state.socket.user);
    const room = useSelector(state => state.socket.room);
    const socket = useSelector(state => state.socket.socket);
    const submittedAns = useSelector(state => state.socket.submittedAns);

    const [content, setContent] = useState({ question: "Question", answers: [""] })
    const [answer, setAnswer] = useState("")
    const [nQsAnsed, setNQsAnsed] = useState(0)

    function mixAns(incorrect_answers, correct_answer) {
        let ranIdx = Math.floor(Math.random() * (incorrect_answers.length + 1))
        let mixed_answers = incorrect_answers.map(a => a);
        mixed_answers.splice(ranIdx, 0, correct_answer)
        return mixed_answers
    }

    function decodeHtml(text) {
        var txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }

    useEffect(() => {
        socket.on('sync-scores', (id, username, scores) => {
            dispatch(sync_socres({ id: id, username: username, scores: scores }))
        })
    }, [])

    useEffect(() => {
        setContent({
            question: qa.contents[nQsAnsed].question,
            answers: mixAns(qa.contents[nQsAnsed].incorrect_answers, qa.contents[nQsAnsed].correct_answer)
        })
    }, [nQsAnsed])

    useEffect(() => {
        if (submittedAns.length) {
            qa.settings.amount === (nQsAnsed + 1) ? submitAnswers() : updateScores()
        }
    }, [submittedAns])

    const handleChange = (e) => {
        if (e.target.checked) {
            setAnswer(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`${nQsAnsed}/${qa.settings.amount} : ${answer}`);
        dispatch(store_answers({ questionNo: nQsAnsed, answer: answer }))
    }

    function updateScores() {
        socket.emit('update-scores', room.roomID, socket.id, user.username, user.scores)
        setNQsAnsed(prev => prev + 1);
    }

    function submitAnswers() {
        // setNQsAnsed(prev => prev = 0) // Loop back for Dev
        socket.emit('submit-results', user.username, user.scores)
        navigate('/results');
    }

    const timer = '???s'

    let progress = (nQsAnsed / qa.settings.amount) * 100
    const customStyle = {
        width: '0%'
    }
    if (progress > 100) {
        progress = 100
    }
    customStyle.width = `${progress}%`

    let quizProgress
    if (nQsAnsed < qa.settings.amount) {
        quizProgress = `${nQsAnsed + 1}/${qa.settings.amount}`
    } else {
        // quizProgress = `${questionNumber}/${location.state.numQuestions}`
        quizProgress = `${nQsAnsed}`
    }

    return (
        <div>
            <div id='gameHeader'>
                <div id='onlinePlayer'>
                    {user.username}
                </div>
                <div id='turn'>
                    {`Question ${quizProgress}`}
                </div>
                <div id='timer'>
                    {timer}
                </div>
            </div>
            <div id='question'>
                {decodeHtml(content.question)}
            </div>
            <div id="progressBar">
                <div id="progress" style={customStyle}></div>
            </div>
            <div id='answerBox'>
                <form id='answerForm' onSubmit={handleSubmit}>

                    <input type='radio' name='answer' value={content.answers[0]} checked={answer === content.answers[0]} onChange={handleChange} id='a1'></input>
                    <label htmlFor="a1">
                        <div id="answer1">
                            {decodeHtml(content.answers[0])}
                        </div>
                    </label>

                    <input type='radio' name='answer' value={content.answers[1]} checked={answer === content.answers[1]} onChange={handleChange} id='a2'></input>
                    <label htmlFor="a2">
                        <div id="answer2">
                            {decodeHtml(content.answers[1])}
                        </div>
                    </label>

                    <input type='radio' name='answer' value={content.answers[2]} checked={answer === content.answers[2]} onChange={handleChange} id='a3'></input>
                    <label htmlFor="a3">
                        <div id="answer3">
                            {decodeHtml(content.answers[2])}
                        </div>
                    </label>

                    <input type='radio' name='answer' value={content.answers[3]} checked={answer === content.answers[3]} onChange={handleChange} id='a4'></input>
                    <label htmlFor="a4">
                        <div id="answer4">
                            {decodeHtml(content.answers[3])}
                        </div>
                    </label>

                    <input type='submit' value='Submit' />

                </form>
                {/* <div id='otherPlayer'><div>{room.players.length} is playing...</div></div> */}
            </div>
        </div>
    )
}
