import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateGame, Game, JoinGame, Leaderboard, Lobby, Menu, NotFound, Results } from './pages';


function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      {/* <CreateGame />
      <Game />
      <JoinGame />
      <Leaderboard />
      <Lobby /> */}
      <Menu />
      {/* <Results /> */}
=======
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CreateGame />
>>>>>>> a3d40e72cf06ee74e9291d2639673912dba83ce2
    </div>
  );
}

export default App;