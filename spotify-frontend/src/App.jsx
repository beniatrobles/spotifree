import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import Player from "./components/Player";
import Layout from "./components/layout/Layout";
import Inicio from "./components/pages/Inicio";
import AlbumDetail from "./components/pages/AlbumDetail";
import ArtistDetail from "./components/pages/ArtistDetail";
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import './css/app.css';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <Routes>
          {/* Rutas fuera del Layout */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas dentro del Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/album/:id" element={<AlbumDetail />} />
            <Route path="/artist/:id" element={<ArtistDetail />} />
          </Route>
        </Routes>

        <Player />
      </Router>
    </PlayerProvider>
  );
}

export default App;
