import React from 'react'

export default function Menu() {
    return (
        <div className='main'>
            <h1>Game</h1>
            <div className='center'>
                <button id='create'>Create Game</button>
                <button id='join'>Join Game</button>
            </div>
            <button id='leaderboard'>Leaderboard</button>
        </div>
    )
}
