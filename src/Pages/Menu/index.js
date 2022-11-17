import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { HomeButton } from '../../components';
import { BackButton } from '../../components';

export default function Menu() {
    return (
        <>
            <HomeButton />
            <BackButton />
            <h1>Welcome to AGTK Quiz</h1>
            <div className='main' id='menu'>
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
            </div>
            <Link to='/leaderboard'>
                <button id='leaderboard'>Leaderboard</button>
            </Link>
        </>
    )
}
