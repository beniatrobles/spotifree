import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import Player from "./components/Player";
import Layout from "./components/layout/Layout";
import Inicio from "./components/pages/Inicio";
import AlbumDetail from "./components/pages/AlbumDetail";
import ArtistDetail from "./components/pages/ArtistDetail";
import './css/app.css';


function App()
{
  return (
    <PlayerProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={ <Inicio /> } />
            <Route path="/album/:id" element={ <AlbumDetail /> } />
            <Route path="/artist/:id" element={ <ArtistDetail /> } />
          </Routes>
        </Layout>
        <Player />
      </Router>
    </PlayerProvider>
  );
}

export default App;