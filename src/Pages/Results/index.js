import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Results() {
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
            <h1>Results</h1>
            <h2>Player 1 scored {p1} points</h2>
            <h2>Player 2 scored {p2} points</h2>
            <h1>{calculateWinner(p1, p2)}</h1>
        </div>
    )
}
