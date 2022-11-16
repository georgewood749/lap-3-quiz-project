import axios from 'axios';
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { saveUser } from '../../actions';
import { store_questions } from '../../actions/questions/questionsSlice';

export default function CreateGame() {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const socket = useSelector((state) => state.socket);

    const [gameInfo, setGameInfo] = useState({
        username: "",
        difficulty: "",
        numQuestions: "",
        category: ""
    });

    const [roomCode, setRoomCode] = useState("");

    const [Qs, setQs] = useState([])


    function SubmitButton() {
        if (gameInfo.difficulty && gameInfo.numQuestions && gameInfo.category) {
            return <input type='submit' value='Submit'></input>
        } else {
            return <input type='submit' value='Submit' disabled></input>
        };
    };

    function SubmitButtonOffline() {
        if (gameInfo.difficulty && gameInfo.numQuestions && gameInfo.category) {
            return <input type='submit' value='Offline' onClick={handleSubmitOffline}></input>
        } else {
            return <input type='submit' value='Offline' disabled></input>
        };
    };

    const getRandomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleDifficultyChange = (e) => {
        e.preventDefault();
        const input = e.target.value
        setGameInfo({ ...gameInfo, difficulty: input })
    };

    const handleNumQuestionsChange = (e) => {
        e.preventDefault();
        const input = e.target.value
        setGameInfo({ ...gameInfo, numQuestions: input })
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        const input = e.target.value
        setGameInfo({ ...gameInfo, category: input })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const questions = fetchQuestions(gameInfo.category, gameInfo.numQuestions, gameInfo.difficulty)
        const random = getRandomNum(100000, 999999)
        setRoomCode(random)
        socket.emit("new game", {
            room: random,
            host: gameInfo.username,
            questions
        })
        // alert(`Room ID: ${random}`)
        dispatch(saveUser(gameInfo.username));
        setGameInfo([
            {
                username: "",
                difficulty: "",
                numQuestions: "",
                category: "",
                id: Math.random() * 1000
            }
        ]);
        navigate('/');
        // <Navigate to='/lobby' />
    };

    const handleSubmitOffline = (e) => {
        e.preventDefault();
        const questionsArray = fetchQuestions(gameInfo.category, gameInfo.numQuestions, gameInfo.difficulty)
        setQs(questionsArray)
        dispatch(store_questions(Qs))
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
        // <Navigate to='/lobby' />
    };

    const fetchQuestions = async (category, numQuestions, difficulty) => {
        // Key:
        // Categories: id between 9-32
        // numQuestions: number (up to 50)
        // difficulty: easy/medium/hard

        try {
            const { data } = await axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`)
            const questions = data.results
            // console.log(questions)
            return questions;
        } catch (err) {
            throw new Error(err.message)
        }
    }


    return (
        <div className='main'>
            <h1>Create Game</h1>
            <form id='create' className='center' onSubmit={handleSubmit}>
                <input id="username" placeholder='Enter username' />
                <br />

                <label htmlFor="difficulty">Difficulty: </label>
                <select id="difficulty"
                    value={gameInfo.difficulty}
                    onChange={handleDifficultyChange}>
                    <option value="">- - Please select - -</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <br />

                <label htmlFor="numQuestions">Number of Questions: </label>
                <input type="number" id='numQuestions' min={5} max={50} required
                    value={gameInfo.numQuestions}
                    onChange={handleNumQuestionsChange}></input>
                <br />

                <label htmlFor="category">Category: </label>
                <select id="category"
                    value={gameInfo.category}
                    onChange={handleCategoryChange}>
                    <option value="">- - Please select - -</option>
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

                <SubmitButton />
                <SubmitButtonOffline />

            </form>
        </div>
    )
}
