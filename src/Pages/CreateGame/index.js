import React, {useState} from 'react'

export default function CreateGame() {

    const [difficulty, setDifficulty] = useState('')
    const [num, setNum] = useState('')
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')

    function SubmitButton(){
        if (difficulty && num && category && type){
            return <input type='submit' value='Submit'></input>
        } else {
            return <input type='submit' value='Submit' disabled></input>
        };
    };

    return (
        <div className='main'>
            <h1>Create Game</h1>
            <form id='create' className='center'>
                {/* <label htmlFor="difficulty">Difficulty: </label> */}
                <select id="difficulty" value={difficulty} onChange={ e => setDifficulty(e.target.value) }>
                    <option value=''>Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <br/>

                {/* <label htmlFor="numQuestions">Number of Questions: </label> */}
                <input type="number" id='numQuestions' min={5} max={50} placeholder={'Number of Questions'} value={num} onChange={ e => setNum(e.target.value) }></input>
                <br/>

                {/* <label htmlFor="category">Category: </label> */}
                <select id="category" value={category} onChange={ e => setCategory(e.target.value) }>
                    <option value=''>Category</option>
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
                <br/>

                {/* <label htmlFor="questionType">Question Type: </label> */}
                <select id="questionType" value={type} onChange={ e => setType(e.target.value) }>
                    <option value=''>Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True or False</option>
                </select>
                <br/> 

                <SubmitButton />
                {/* <input type='submit' value='Create'></input> */}

            </form>
        </div>
    )
}
