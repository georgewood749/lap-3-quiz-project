import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { HomeButton } from '../../components'
import { BackButton } from '../../components'

export default function Leaderboard() {
    const [usersData, setUsersData] = useState([])


    const fetchPoints = async () => {
        const fetchURL = 'https://lap-3-quiz-backend.herokuapp.com/users/leaderboard'
        // const fetchPointsData = 'http://localhost:3000/users/leaderboard'
        try {
            const pointsData = await axios.get(fetchURL)
            setUsersData(pointsData.data.users)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchPoints()
    }, [])


    const renderLeaderboard = usersData.slice(0, 8).map((pos, index) => {
        index ++
        switch (index) {
            case 1:
                index = "🥇"
                break
            case 2:
                index = "🥈"
                break
            case 3:
                index = "🥉"
                break
            default:
                index = index
        }
        return (
            <div className='leaderboardRow'>
                <h2>{index}: {pos.username}</h2>
                <h2>{pos.scores}</h2>
            </div>
        )
    })

    return (
        <div>
            <HomeButton />
            <BackButton />
            <h1>Leaderboard</h1>
            {renderLeaderboard}
        </div>
    )
}
