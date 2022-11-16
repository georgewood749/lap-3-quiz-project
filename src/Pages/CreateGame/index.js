import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { store_qa, store_room, add_player } from '../../actions/socket/socketSlice'


export default function CreateGame() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const socket = useSelector(state => state.socket.socket)
    const qa = useSelector(state => state.socket.qa);

    const [gameInfo, setGameInfo] = useState({
        username: "",
        difficulty: "",
        numQuestions: "",
        category: "",
        questionType: ""
    });


    const fetchQuestions = async (category, numQuestions, difficulty, type) => {
        //* Key:
        // Categories: id between 9-32
        // numQuestions: number (up to 50)
        // difficulty: easy/medium/hard
        // type: multiple/boolean
        try {
            const { data } = await axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`)
            // return data
            dispatch(store_qa(data));
        } catch (err) {
            // if (data.response_code === 1) { throw Error('Unable to retrieve enough questions!') }
            throw new Error(err.message)
        }
    }
        //! try fetchQA in socket.io-server and use cb to dispatch store_qa

    const handleSubmit = (e) => {
        e.preventDefault();
        // fetchQuestions(gameInfo.category, gameInfo.numQuestions, gameInfo.difficulty, gameInfo.questionType)

        //* Create a roomID and join
        // const roomID = Math.ceil(Math.random() * 100);
        socket.emit('join-room', "2", roomInfo => {
            dispatch(store_room(roomInfo));
        })

        setGameInfo([
            {
                username: "",
                difficulty: "",
                numQuestions: "",
                category: "",
                questionType: "",
            }
        ]);
        navigate('/lobby');
    };




    return (
        <div className='main'>
            <h1>Create Game</h1>
            <form id='create' className='center' onSubmit={handleSubmit} role="form">

                {/* <label htmlFor="difficulty">Difficulty: </label> */}
                <select id="difficulty"
                    value={gameInfo.difficulty}
                    onChange={(e) => setGameInfo({...gameInfo, difficulty: e.target.value})}>
                    <option value="">Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <br/>

                {/* <label htmlFor="numQuestions">Number of Questions: </label> */}
                <input type="number" 
                id='numQuestions' 
                min={5} max={50} 
                placeholder='Number of Questions' 
                required 
                value={gameInfo.numQuestions} 
                onChange={(e) => setGameInfo({ ...gameInfo, numQuestions: e.target.value })}></input>
                <br />

                {/* <label htmlFor="category">Category: </label> */}
                <select id="category"
                    value={gameInfo.category}
                    onChange={(e) => setGameInfo({ ...gameInfo, category: e.target.value })}>
                    <option value="">Category</option>
                    <option value={9}>General Knowledge</option>
                    <option value={10}>Books</option>
                    <option value={11}>Film</option>
                    <option value={12}>Music</option>
                    <option value={13}>Musicals & Theatres</option>
                    <option value={14}>Television</option>
                    <option value={15}>Video Games</option>
                    <option value={16}>Board Games</option>
                    <option value={17}>Science & Nature</option>
                    <option value={18}>Computers</option>
                    <option value={19}>Mathematics</option>
                    <option value={20}>Mythology</option>
                    <option value={21}>Sports</option>
                    <option value={22}>Geography</option>
                    <option value={23}>History</option>
                    <option value={24}>Politics</option>
                    <option value={25}>Art</option>
                    <option value={26}>Celebrities</option>
                    <option value={27}>Animals</option>
                    <option value={28}>Vehicles</option>
                    <option value={29}>Comics</option>
                    <option value={30}>Gadgets</option>
                    <option value={31}>Japanese Anime & Manga</option>
                    <option value={32}>Cartoon & Animations</option>
                </select>
                <br />

                {/* <label htmlFor="questionType">Question Type: </label> */}
                <select id="questionType"
                    value={gameInfo.questionType}
                    onChange={(e) => setGameInfo({ ...gameInfo, questionType: e.target.value })}>
                    <option value="">Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True or False</option>
                </select>
                <br />

                {/* <input type='submit' value="Submit" /> */}
                <input type='submit' value='Submit' disabled={!(gameInfo.difficulty && gameInfo.numQuestions && gameInfo.category && gameInfo.questionType)}></input>

            </form>
        </div>
    )
}
