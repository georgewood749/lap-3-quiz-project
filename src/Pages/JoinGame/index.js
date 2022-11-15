import React, { useState } from 'react'

import Lobby from '../Lobby'

export default function JoinGame({ socket }) {

    const [username, setUserName] = useState("")
    const [meetingID, setMeetingId] = useState("")
    const [showGame, setShowGame] = useState(false)

    const handleName = (e) => {
        setUserName(e.target.value)

    }

    const handleMeetingID = (e) => {
        setMeetingId(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        socket.emit("join_meeting", meetingID);
        setShowGame(true);
    }


    return (
        <div className='main'>
            {!showGame ? (
                <>
            <h1>Join Game</h1>

            <form onSubmit={handleSubmit} id='join' className='center'  >
                <div className="input_wrap">
                    <input onChange={handleMeetingID} value={meetingID} type="text" required />
                    <label>Enter Meeting ID</label>
                </div>

                <div className="input_wrap">
                    <input onChange={handleName} value={username} type="text" required />
                    <label>Enter Username</label>
                </div>

                <input type='submit' value='Submit'></input>
            </form>
            </>
            ) : (
                < Lobby /> 
            )}

        </div>
    )
}

// {!showGame ? (): ()}