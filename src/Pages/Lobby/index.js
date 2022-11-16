import React, { useState, useEffect } from 'react';
import loading from "./loading.png";
import { useSelector, useDispatch } from 'react-redux';


export default function Lobby() {



    //* Socket
    const socket = useSelector(state => state.socket.socket)
    const roomInfo = useSelector(state => state.socket.room)
    const dispatch = useDispatch();

    const [ players, setPlayers ] = useState(0)

    useEffect(()=>{
        socket.on('update-players', (players, cb) => {
            setPlayers(players); 
            cb(players)})
    },[])

    return (
        <div>
            <h1>Lobby</h1>
            <div id='lobbyID'>Meeting ID: {roomInfo.roomID}</div>
            <div id='lobby' className='center'>
                <img src={loading} alt="Loading" />
                <h2 id='playerCount'>{players} players in lobby...</h2>
            </div>
        </div>
    )
}
