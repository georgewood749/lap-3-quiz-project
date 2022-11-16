import React, { useState, useEffect } from 'react';
import loading from "./loading.png";
import { useSelector, useDispatch } from 'react-redux';
import { store_room } from '../../actions/socket/socketSlice';


export default function Lobby() {



    //* Socket
    const socket = useSelector(state => state.socket.socket)
    const roomInfo = useSelector(state => state.socket.room)
    const dispatch = useDispatch();

    useEffect(()=>{
        socket.on('update-players', (roomID, roomSize, playersID) => {
            dispatch(store_room({roomID: roomID, roomSize: roomSize, playersID: playersID}))
        })
    },[])

    return (
        <div>
            <h1>Lobby</h1>
            <div id='lobbyID'>Meeting ID: {roomInfo.roomID}</div>
            <div id='lobby' className='center'>
                <img src={loading} alt="Loading" />
                <h2 id='playerCount'>{roomInfo.roomSize} players in lobby...</h2>
            </div>
        </div>
    )
}
