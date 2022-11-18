import React, { useEffect } from 'react';

//* Components & Style
import loading from "./loading.png";
import { HomeButton } from '../../components';
import { BackButton } from '../../components';

//* Redux
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
        socket.on('update-room', (room, playersID) => {
            dispatch(update_room({roomID: room, players: playersID}))
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
            <HomeButton />
            <BackButton />
            <h1>Lobby</h1>
            <div id='lobbyID'>Room ID: {roomInfo.roomID}</div>
            <div id='lobby' className='center'>
                <img src={loading} alt="Loading" />
                <h2 id='playerCount'>{roomInfo.players.length} players in lobby...</h2>
            </div>
            <div id='centerStartGame'>
                <button id='startGame' disabled={!isHost} onClick={startGame}>Let's GO!</button>
            </div>
        </div>
    )
}
