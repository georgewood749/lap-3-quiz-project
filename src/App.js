import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateGame, JoinGame, Leaderboard, Menu, NotFound, Game, Lobby, Results, OfflineGame } from './pages';
import { useDispatch, useSelector } from "react-redux";
import { addPoints, finish, newUser, saveSocket, updateState } from './actions';
const io = require("socket.io-client");
const API = "https://lap-3-quiz-backend.herokuapp.com/"


function App() {
  const dispatch = useDispatch()
  const [socket, setSocket] = useState()
  const quiz = useSelector((state) => state.quiz)
  const currentPlayer = useSelector((state) => state.quiz)
  const roomHost = useSelector((state) => state.quiz.host)

  useEffect(() => {
    const newSocket = io(API)

    newSocket.on("update state", (state) => {
      dispatch(updateState(state))
    })

    newSocket.on("update scores", ({ user, score }) => {
      dispatch(addPoints(user, score))
    })

    newSocket.on("update player completion", (currentPlayer) => {
      dispatch(finish(currentPlayer))
    })

    dispatch(saveSocket(newSocket))
    setSocket(newSocket)
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on("player joining room", (player) => {
        if (currentPlayer === roomHost) {
          dispatch(newUser(player))
          let newQuiz = { ...quiz }
          quiz.users.push({
            username: player,
            points: 0,
            finished: false
          })
          socket.emit("send state to users", newQuiz)
        }
      })
    }
  }, [socket, roomHost, currentPlayer])

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
        <Route path="/offline" element={<OfflineGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
