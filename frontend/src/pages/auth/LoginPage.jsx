import React, { useState } from 'react';
import apiRequest from '../../utils/axios';
import api from '../../constants/api';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const [url, method] = api('login');

    try {
      const response = await apiRequest({
        url,
        method,
        data: {
          email,
          password,
        },
      });
      console.log('로그인 성공', response.data);
      navigate('/StudyPage')
      // 로그인 성공 후 처리 (예: 사용자 정보 페이지로 이동)
    } catch (error) {
      console.error('로그인 실패', error);
      // 로그인 실패 처리
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">로그인</button>
    </form>
  );
}

export default Login;
