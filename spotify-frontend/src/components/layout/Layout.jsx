import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import '../../css/layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
       <Header />
      <Sidebar />
      <main className="mainContent">{children}</main>
    </div>
  );
}