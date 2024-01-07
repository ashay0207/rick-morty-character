// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterPage from './CharacterPage';
import CharacterDetails from './CharacterDetails';
import Navbar from './Navbar'; // Add this line

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<CharacterPage />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
