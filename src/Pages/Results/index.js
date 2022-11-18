import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { HomeButton } from '../../components';


export default function Results() {
    const room = useSelector(state => state.socket.room);

    const [results, setResults] = useState(<div className='leaderboardRow'></div>)

    setResults(room.players.map(p => (
        <div className='leaderboardRow'>
            <h2>{p.username}</h2>
            <h2>{p.scores}</h2>
        </div>
    )).sort((a, b) => b.scores - a.scores))



    return (
        <div>
            <HomeButton />
            <h1>Results</h1>
            <h1>
                Podium
            </h1>
            <div id='winner'>
                Congratulations first!
            </div>
            <div className='leaderboardRow'>
            {results}

            </div>
        </div>
    )
}
