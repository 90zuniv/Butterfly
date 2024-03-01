import React from 'react';
import EnglishStudyPage from "./pages/main/MainPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudyPage from "./pages/main/StudyPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EnglishStudyPage />} />
        <Route path='/study' element={<StudyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
