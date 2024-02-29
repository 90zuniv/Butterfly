import React from 'react';
import EnglishStudyPage from "./pages/main/MainPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EnglishStudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
