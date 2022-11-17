import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { HomeButton } from '../../components'

export default function OfflineResults() {
    
    const location = useLocation()
    
    const p1 = location.state.p1
    const p2 = location.state.p2

    function calculateWinner(p1, p2) {
        if (p1 > p2) {
            return "Player 1 wins! 👑"
        } else if (p2 > p1) {
            return "Player 2 wins! 👑"
        } else {
            return "It was a draw! ⚔️"
        }
    }
    return (
        <div>
            <HomeButton />
            <h1>Results</h1>
            <div id='player1_2'>
                <h2 className='offlineResults'>Player 1 scored: {p1} points</h2>
                <h2 className='offlineResults'>Player 2 scored: {p2} points</h2>
            </div>
            <br />
            <h2 className='offlineResults'>{calculateWinner(p1, p2)}</h2>
        </div>
    )
}
