import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

//* Components
import { HomeButton } from '../../components';
import { BackButton } from '../../components';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { store_user } from '../../actions/socket/socketSlice';

export default function JoinGame() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [roomID, setRoomID] = useState()
    const [username, setUsername] = useState('')

    const socket = useSelector(state => state.socket.socket)

    const handleSubmit = (e) => {
		e.preventDefault();
        socket.emit('join-room', +roomID, username)
        dispatch(store_user({ username: username, isHost: false }))
		navigate("/lobby");
	};

    function SubmitButton(){
        if ((+roomID >= 100000 && +roomID <= 999999) && username){
            return <input type='submit' value='Submit'></input>
        } else {
            return <input type='submit' value='Submit' disabled></input>
        };
    };

    return (
        <>
            <HomeButton />
            
            <BackButton />

            <h1>Join Game</h1>
            <form id='join' className='center main' onSubmit={handleSubmit}>
                <div className="input_wrap">
                    <input required type="text" value={roomID} onChange={ e => setRoomID(e.target.value) } />
                    <label>Enter Room ID</label>
                </div>

                <div className="input_wrap">
                    <input required type="text" value={username} onChange={ e => setUsername(e.target.value) } />
                    <label>Enter Username</label>
                </div>

                <SubmitButton />
                {/* <input type='submit' value='Submit' disabled={!(+roomID >= 100000 && +roomID <= 999999) && username} /> */}

            </form>
        </>
    )
}
