import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function JoinGame() {

    const navigate = useNavigate();

    const [meetingID, setMeetingID] = useState('')
    const [username, setUsername] = useState('')

    function SubmitButton(){
        if (meetingID && username){
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
        <div className='main'>
            <h1>Join Game</h1>

            <form id='join' className='center' onSubmit={handleSubmit}>
                <div className="input_wrap">
                    <input required type="text" value={meetingID} onChange={ e => setMeetingID(e.target.value) } />
                    <label>Enter Meeting ID</label>
                </div>

                <div className="input_wrap">
                    <input required type="text" value={username} onChange={ e => setUsername(e.target.value) } />
                    <label>Enter Username</label>
                </div>

                <SubmitButton/>
                {/* <input type='submit' value='Submit'></input> */}
            </form>

        </div>
    )
}
