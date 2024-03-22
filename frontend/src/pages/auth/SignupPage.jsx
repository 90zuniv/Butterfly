import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../utils/axios';
import api from '../../constants/api';



function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // 히스토리 객체를 사용하여 네비게이션

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await apiRequest.post('/user/', { email, password }); // axios 설정에 따라 경로를 조정하세요
      console.log('회원가입 성공');
      navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error('회원가입 실패', error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">회원가입</button>
    </form>
  );
}

export default Signup;
