import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { store_room } from '../../actions/socket/socketSlice'


export default function JoinGame() {

    const navigate = useNavigate();

    const [roomID, setRoomID] = useState('')
    const [username, setUsername] = useState('')

    //* Socket
    const socket = useSelector(state => state.socket.socket)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
		e.preventDefault();

        socket.emit('join-room', roomID, username, roomInfo => {
            dispatch(store_room(roomInfo));
        })

		navigate("/lobby");
	};

    return (
        <div className='main'>
            <h1>Join Game</h1>

            <form id='join' className='center' onSubmit={handleSubmit}>
                <div className="input_wrap">
                    <input required type="text" value={roomID} onChange={ e => setRoomID(e.target.value) } />
                    <label>Enter Room ID</label>
                </div>

                <div className="input_wrap">
                    <input required type="text" value={username} onChange={ e => setUsername(e.target.value) } />
                    <label>Enter Username</label>
                </div>

                <input type='submit' value='Submit' disabled={!(roomID && username)}></input>
            </form>

        </div>
    )
}
