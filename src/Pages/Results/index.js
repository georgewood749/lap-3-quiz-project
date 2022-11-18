// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { HomeButton } from '../../components';


// export default function Results() {
//     const room = useSelector(state => state.socket.room);

//     const [results, setResults] = useState(<div className='leaderboardRow'></div>)

//     setResults(room.players.map(p => (
//         <div className='leaderboardRow'>
//             <h2>{p.username}</h2>
//             <h2>{p.scores}</h2>
//         </div>
//     )).sort((a, b) => b.scores - a.scores))



//     return (
//         <div>
//             <HomeButton />
//             <h1>Results</h1>
//             <h1>
//                 Podium
//             </h1>
//             <div id='winner'>
//                 Congratulations first!
//             </div>
//             {results}
//             {/* <div className='leaderboardRow'>
//                 <h2>first 🥇</h2>
//                 <h2>1000</h2>
//             </div>
//             <div className='leaderboardRow'>
//                 <h2>second 🥈</h2>
//                 <h2>750</h2>
//             </div>
//             <div className='leaderboardRow'>
//                 <h2>third 🥉</h2>
//                 <h2>500</h2>
//             </div>
//             <div className='leaderboardRow'>
//                 <h2>fourth</h2>
//                 <h2>250</h2>
//             </div> */}
//         </div>
//     )
// }
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HomeButton } from '../../components'


export default function Results() {
    const room = useSelector(state => state.socket.room);

    const [ results, setResults ] = useState(<div className='leaderboardRow'></div>)

    useEffect(() => {
        setResults(room.players.map( p => (
            <div className='leaderboardRow'>
                <h2>{p.username}</h2>
                <h2>{p.scores}</h2>
            </div>
        )).sort((a,b) => b.scores - a.scores))
    },[room])

    return (
        <div>
            <HomeButton />
            <h1>
                Podium
            </h1>
            {results}
        </div>
    )
}
