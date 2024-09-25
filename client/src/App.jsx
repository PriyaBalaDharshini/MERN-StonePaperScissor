import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import GameData from './components/GameData';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/game-data" element={<GameData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
