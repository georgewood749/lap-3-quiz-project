import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { HomeButton } from '../../components'


export default function Results() {
    const [post, setPost] = useState('')
    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://lap-3-quiz-backend.herokuapp.com/users',
            data: {
                "username": "Player 1",
                "avatar_url": "https://xsgames.co/randomusers/assets/avatars/pixel/23.jpg",
                "scores": p1
            }
        });
    }, [post])
    
    useEffect(() => {
        axios({
            method: 'post',
            url: 'https://lap-3-quiz-backend.herokuapp.com/users',
            data: {
                "username": "Player 2",
                "avatar_url": "https://xsgames.co/randomusers/assets/avatars/pixel/23.jpg",
                "scores": p2
            }
        });
    }, [post])
    const location = useLocation()
    const p1 = location.state.p1
    const p2 = location.state.p2

    function calculateWinner(p1, p2) {
        if (p1 > p2) {
            return "Player 1 wins!"
        } else if (p2 > p1) {
            return "Player 2 wins!"
        } else {
            return "It was a draw!"
        }
    }
    return (
        <div>
            <HomeButton />
            <h1>Results</h1>
            <h2>Player 1 scored {p1} points</h2>
            <h2>Player 2 scored {p2} points</h2>
            <h1>{calculateWinner(p1, p2)}</h1>
        </div>
    )
}
