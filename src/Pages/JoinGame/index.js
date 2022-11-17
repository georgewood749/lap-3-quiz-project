import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function JoinGame() {

    const navigate = useNavigate();

    const [roomID, setRoomID] = useState('')
    const [username, setUsername] = useState('')

    function SubmitButton(){
        if ((+roomID >= 100000 && +roomID <= 999999) && username){
            return <input type='submit' value='Submit'></input>
        } else {
            return <input type='submit' value='Submit' disabled></input>
        };
    };

    const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/lobby");
	};

    return (
        <>
            <h1>Join Game</h1>
            <form id='join' className='center main' onSubmit={handleSubmit}>
                <div className="input_wrap">
                    <input required type="text" value={roomID} onChange={ e => setRoomID(e.target.value) } />
                    <label>Enter Room ID</label>
                </div>

                <div className="input_wrap">
                    <input required type="text" value={username} onChange={ e => setUsername(e.target.value) } />
                    <label>Enter Username</label>
                </div>

                <SubmitButton/>
            </form>
        </>
    )
}
