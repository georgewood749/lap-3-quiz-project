import React from 'react';
import loading from "./loading.png";

export default function Lobby() {

    const currentMeeting = 'xxx'
    const players = 0 // to change

    return (
        <div>
            <h1>Lobby</h1>
            <div id='lobbyID'>Meeting ID: {currentMeeting}</div>
            <div id='lobby' className='center'>
                <img src={loading} alt="Loading" />
                <h2 id='playerCount'>{players} players in lobby...</h2>
            </div>
        </div>
    )
}
