import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

//* Components
import { HomeButton } from '../../components';
import { BackButton } from '../../components';

//* Redux
import { useSelector, useDispatch } from "react-redux";
import { store_user, store_qa } from '../../actions/socket/socketSlice'


export default function CreateGame() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const socket = useSelector(state => state.socket.socket)

    const getRandomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [gameInfo, setGameInfo] = useState({
        username: "",
        difficulty: "",
        numQuestions: "",
        category: ""
    });

    function Online() {
        if (gameInfo.difficulty && (gameInfo.numQuestions >= 5 && gameInfo.numQuestions <= 50) && gameInfo.category && gameInfo.username) {
            return <input id='online' type='submit' value='Create Room' onClick={handleSubmit}></input>
        } else {
            return <input id='online' type='submit' value='Create Room' disabled></input>
        };
    };

    function Offline() {
        if (gameInfo.difficulty && (gameInfo.numQuestions >= 5 && gameInfo.numQuestions <= 50) && gameInfo.category) {
            return <input id='offline' type='submit' value='Start Quiz' onClick={handleSubmitOffline}></input>
        } else {
            return <input id='offline' type='submit' value='Start Quiz' disabled></input>
        };
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('join-room', getRandomNum(100000, 999999), gameInfo.username)
        socket.emit('set-game', gameInfo.category, gameInfo.numQuestions, gameInfo.difficulty, 'multiple', qa => {
            dispatch(store_user({ username: gameInfo.username, isHost: true }))
            dispatch(store_qa(qa))
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

    const handleSubmitOffline = (e) => {
        e.preventDefault();
        navigate('/offline', { state: { category: gameInfo.category, numQuestions: gameInfo.numQuestions, difficulty: gameInfo.difficulty } });
        setGameInfo([
            {
                username: "",
                difficulty: "",
                numQuestions: "",
                category: "",
                id: Math.random() * 1000
            }
        ]);
    };


    return (
        <>
            <HomeButton />
            <BackButton />
            <h1>Create Game</h1>
            <form id='create' className='center main' onSubmit={handleSubmit}>

            <select id="difficulty"
                    value={gameInfo.difficulty}
                    onChange={(e) => setGameInfo({...gameInfo, difficulty: e.target.value})}>
                    <option value="">Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <br/>

                <input type="number" 
                id='numQuestions' 
                min={5} max={50} 
                placeholder='Number of Questions' 
                required 
                value={gameInfo.numQuestions} 
                onChange={(e) => setGameInfo({ ...gameInfo, numQuestions: e.target.value })}></input>
                <br />

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

                <Offline />

                <div className="input_wrap" id='creator'>
                    <input required type="text" value={gameInfo.username} onChange={e => setGameInfo({ ...gameInfo, username: e.target.value })} />
                    <label>Enter Username</label>
                </div>

                <Online />


            </form>
        </>

    )
}
