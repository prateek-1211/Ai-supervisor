import Navbar from "./components/Navbar";
import Dashboard from "./Pages/Dashboard";
import PendingRequests from "./Pages/PendingRequests";
import KnowledgeBase from "./components/KnowledgeBase";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="grid">
        <Dashboard />
        <PendingRequests />
        <KnowledgeBase />
      </div>
    </div>
  );
}
