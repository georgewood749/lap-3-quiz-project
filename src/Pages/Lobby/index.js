import React, { useEffect, useState } from 'react';
import loading from "./loading.png";
import { useSelector, useDispatch } from 'react-redux';
import { store_qa, update_room } from '../../actions/socket/socketSlice';
import { useNavigate } from "react-router-dom";


export default function Lobby() {
    const navigate = useNavigate();
    

    //* Socket
    const socket = useSelector(state => state.socket.socket)
    const roomInfo = useSelector(state => state.socket.room)
    const isHost = useSelector(state => state.socket.user.isHost)
    const qa = useSelector(state => state.socket.qa);
    const dispatch = useDispatch();

    useEffect(()=>{
        // socket.on('update-players', (roomID, roomSize, playersID) => {
        //     dispatch(store_room({roomID: roomID, roomSize: roomSize, playersID: playersID}))
        // })
        socket.on('update-room', (room, playersName) => {
            dispatch(update_room({roomID: room, players: playersName}))
        })

        socket.on('teleport-players', (qa) => {
            navigate("/game")
            dispatch(store_qa(qa))
        })
    },[])

    const startGame = () => {
        socket.emit('start-game', roomInfo.roomID, qa)
        
    }

    return (
        <div>
            <h1>Lobby</h1>
            <div id='lobbyID'>Meeting ID: {roomInfo.roomID}</div>
            <div id='lobby' className='center'>
                <img src={loading} alt="Loading" />
                <h2 id='playerCount'>{roomInfo.players.length} players in lobby...</h2>
            </div>
            <button disabled={!isHost} onClick={startGame}>Let's GO!</button>
        </div>
    )
}
