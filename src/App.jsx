import { Routes, Route, Navigate } from "react-router-dom";
import VotingPage from "./pages/VotingPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import NavBar from "./components/NavBar.jsx";

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

