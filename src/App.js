import './App.css';
import { CreateGame, Game, JoinGame, Leaderboard, Lobby, Menu, Results } from './Pages'

function App() {
  return (
    <div className="App">
      <CreateGame />
      <Game />
      <JoinGame />
      <Leaderboard />
      <Lobby />
      <Menu />
      <Results />
    </div>
  );
}

export default App;
