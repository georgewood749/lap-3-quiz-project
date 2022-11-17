import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//* Pages
import { CreateGame, JoinGame, Leaderboard, Menu, NotFound, Game, Lobby, Results, OfflineGame, OfflineResults } from './Pages';

//* Redux
import { useDispatch, useSelector } from "react-redux";

//* Socket
import { store_socket } from './actions/socket/socketSlice'
import io from 'socket.io-client';
const serverEP = "https://lap-3-quiz-backend.herokuapp.com/";
// const serverEP = "http://localhost:3030"; 


function App() {
  const dispatch = useDispatch();
  const socket = useSelector(state => state.socket.socket)

  useEffect(() => {
    const pubSocket = io(serverEP);
    pubSocket.on('connect', () => {
      dispatch(store_socket(pubSocket))
    })
  },[])

  useEffect(() => {
    if(socket){
      console.log(socket.id);
    }
  },[socket])



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/offline" element={<OfflineGame />} />
        <Route path="/offline_results" element={<OfflineResults />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
