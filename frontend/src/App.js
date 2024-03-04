import React from 'react';
import EnglishStudyPage from "./pages/main/MainPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EnglishStudyPage />} />
        <Route path='src/pages/study/studyPage.js' element={<studyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
