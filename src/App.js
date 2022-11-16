import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateGame, Game, JoinGame, Leaderboard, Lobby, Menu, NotFound, Results } from './Pages';
import { useSelector, useDispatch } from 'react-redux';
import { store_socket } from './actions/socket/socketSlice'
import io from 'socket.io-client';
const serverEP = "http://localhost:3030/";



function App() {
  const dispatch = useDispatch();
  const socket = useSelector(state => state.socket.id)

  useEffect(() => {
    const newSocket = io(serverEP);
    dispatch(store_socket(newSocket))
  },[])

  useEffect(() => {
    if(socket){
      console.log(socket);
    }
  },[socket])



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/game" element={<Game />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
