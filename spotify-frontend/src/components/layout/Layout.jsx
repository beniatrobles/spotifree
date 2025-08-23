import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import '../../css/layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main className="mainContent">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
}
