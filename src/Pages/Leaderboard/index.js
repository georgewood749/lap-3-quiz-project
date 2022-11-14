import React, { useState, useEffect } from 'react'
// import axios from 'axios'

export default function Leaderboard() {
    const [usersData, setUsersData] = useState([])
    const [points, setPoints] = useState('')
    const [users, setUsers] = useState('')

    const fetchPoints = async () => {
        const fetchPointsData = 'https://lap-3-quiz-backend.herokuapp.com/api/getAll'
        try {
            const pointsDataRaw = await fetch(fetchPointsData);
            const pointsData = await pointsDataRaw.json();
            // const pointsData = axios.get(fetchPointsData)
            const users = pointsData.map(user => user.username)
            const points = pointsData.map(user => user.points)
            setUsersData(pointsData)
            setUsers(users)
            setPoints(points)
            console.log("usersData: ", usersData)
            console.log("users: ", users)
            console.log("points: ", points)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchPoints()
    }, [])

    return (
        <div>
            <h1>Leaderboard</h1>
        </div>
    )
}
