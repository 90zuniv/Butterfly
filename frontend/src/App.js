import React, {useState, useEffect} from 'react';
import EnglishStudyPage from "./pages/main/MainPage";
import StudyPage from './pages/study/StudyPage';
import ChatPage from './pages/chatAi/ChatPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from "./pages/main/TestPage"
import Layout from './components/Header'
import AuthPageLayout from './pages/auth/AuthPageLayout'
import SignupPage from './pages/auth/SignupPage'


function App() {
  const [content, setContent] = useState([]);
  const [formData, setFormData] = useState({
    content_link : '',
    content_thumbnail : '',
  });

  return (
    <>
    <Layout />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EnglishStudyPage />} />
        {/* <Route path="/auth" element={<AuthPageLayout />}> */}
          {/* <Route path="login" element={<LoginPage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        {/* </Route> */}
        <Route path='/StudyPage' element={<StudyPage />} />
        <Route path='/test' element={<Test />} />
        <Route path='/ChatPage' element={<ChatPage />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
