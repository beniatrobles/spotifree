import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Inicio from "./components/pages/Inicio";
import './css/app.css';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;