import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateGame, JoinGame, Leaderboard, Menu, NotFound } from './pages';


function App() {
  return (
    <div className="App">
      {/* <Menu /> */}
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <CreateGame /> */}
    </div>
  );
}

export default App;