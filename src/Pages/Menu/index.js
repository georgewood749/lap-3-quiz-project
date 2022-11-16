import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
    return (
        <div className='main'>
            <h1>Welcome</h1>

            <div className='center'>
                <Link to='/create'>
                    <button id='create'>Create Game</button>
                </Link>

                <fieldset>
                    <legend>or</legend>
                </fieldset>

                <Link to='/join'>
                    <button id='join'>Join Game</button>
                </Link>
            </div>

            <Link to='/leaderboard'>
                <button id='leaderboard'>Leaderboard</button>
            </Link>
        </div>
    )
}
