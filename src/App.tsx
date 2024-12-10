import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/main/Main';

function App() {
  return (
    <Router>


      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
        <Header />

        <main className="wrapper" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </main>
        <Footer />

      </div>
    </Router>
  );
}

export default App;
