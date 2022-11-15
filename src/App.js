import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateGame, JoinGame, Leaderboard, Menu, NotFound, Game, Lobby, Results } from './pages';
import { useDispatch, useSelector } from "react-redux";


function App() {
  const dispatch = useDispatch()
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
