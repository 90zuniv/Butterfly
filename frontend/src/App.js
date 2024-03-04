import React from 'react';
import EnglishStudyPage from "./pages/main/MainPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from "./pages/main/test"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EnglishStudyPage />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
