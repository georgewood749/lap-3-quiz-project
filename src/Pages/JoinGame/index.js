import React, {useState} from 'react'

export default function JoinGame() {

    const [meetingID, setMeetingID] = useState('')
    const [username, setUsername] = useState('')

    function SubmitButton(){
        if (meetingID && username){
            return <input type='submit' value='Submit'></input>
        } else {
            return <input type='submit' value='Submit' disabled></input>
        };
    };

    return (
        <div className='main'>
            <h1>Join Game</h1>

            <form id='join' className='center'>
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
