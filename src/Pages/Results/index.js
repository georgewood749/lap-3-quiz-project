import React from 'react'

export default function Results() {
    return (
        <div>
            <h1>
                Podium
            </h1>
            <div id='winner'>
                Congratulations first!
            </div>
            <div className='leaderboardRow'>
                <h2>first 🥇</h2>
                <h2>1000</h2>
            </div>
            <div className='leaderboardRow'>
                <h2>second 🥈</h2>
                <h2>750</h2>
            </div>
            <div className='leaderboardRow'>
                <h2>third 🥉</h2>
                <h2>500</h2>
            </div>
            <div className='leaderboardRow'>
                <h2>fourth</h2>
                <h2>250</h2>
            </div>
        </div>
    )
}
