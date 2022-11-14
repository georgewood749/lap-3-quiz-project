import React, { useState } from 'react'
// import { fetchQuestions } from '../../actions';
import axios from 'axios';


export default function CreateGame() {

    const [gameInfo, setGameInfo] = useState({
        username: "",
        difficulty: "",
        numQuestions: "",
        category: "",
        questionType: ""
    });

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

    const handleQuestionTypeChange = (e) => {
        e.preventDefault();
        const input = e.target.value
        setGameInfo({ ...gameInfo, questionType: input })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchQuestions(gameInfo.category, gameInfo.numQuestions, gameInfo.difficulty, gameInfo.questionType)
        console.log(gameInfo.category)
        console.log(gameInfo.numQuestions)
        console.log(gameInfo.difficulty)
        console.log(gameInfo.questionType)
        setGameInfo([
            {
                username: "",
                difficulty: "",
                numQuestions: "",
                category: "",
                questionType: "",
                id: Math.random() * 1000
            }
        ]);
    };

    const fetchQuestions = async (category, numQuestions, difficulty, type) => {
        // Key:
        // Categories: id between 9-32
        // numQuestions: number (up to 50)
        // difficulty: easy/medium/hard
        // type: multiple/boolean
        try {
            const { data } = await axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`)
            console.log(data)
            return data;
        } catch (err) {
            // if (data.response_code === 1) { throw Error('Unable to retrieve enough questions!') }
            throw new Error(err.message)
        }
    }
    

    return (
        <div>
            <h1>Create Game</h1>
            <form onSubmit={handleSubmit}>
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

                <label htmlFor="questionType">Question Type: </label>
                <select id="questionType"
                    value={gameInfo.questionType}
                    onChange={handleQuestionTypeChange}>
                    <option value="">- - Please select - -</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True or False</option>
                </select>
                <br />

                <input type='submit' value="Create Game" />

            </form>
        </div>
    )
}
