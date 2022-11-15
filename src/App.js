import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateGame, JoinGame, Leaderboard, Menu, NotFound } from './Pages';
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu socket={socket} />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
