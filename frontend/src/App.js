import React, {useState, useEffect} from 'react';
import './App.css';
import EnglishStudyPage from "./pages/main/MainPage";
import StudyPage from './pages/study/StudyPage';
import ChatPage from './pages/chatAi/ChatPage';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Test from "./pages/main/TestPage"
import Layout from './components/Header'
import AuthPageLayout from './pages/auth/AuthPageLayout'
import SignupPage from './pages/auth/SignupPage'
import LoginPage from './pages/auth/LoginPage'
import MyPage from './pages/mypage/MyPage'
import TestPage from './pages/study/TestPage'
import Footer from './components/Footer'


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
          {/* <Route path="login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* </Route> */}
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/StudyPage' element={<StudyPage />} />
        <Route path='/test' element={<Test />} />
        <Route path='/ChatPage' element={<ChatPage />} />
        <Route path='/MyPage' element={<MyPage />} />
        <Route path='/TestPage' element={<TestPage />} />

      </Routes>
    </BrowserRouter>
    {/* <Footer /> */}
    </>
  );
}

export default App;
