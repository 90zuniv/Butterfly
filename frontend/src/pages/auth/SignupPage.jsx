import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../utils/axios';
import api from '../../constants/api';
import Loginbackground from "../../assets/Loginbackground.png"


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

<div style={{
  backgroundImage: `url(${Loginbackground})`, /* 배경 이미지 설정 */
  backgroundSize: 'cover', /* 화면에 꽉 차게 배경 이미지를 조정 */
  backgroundPosition: 'center', /* 배경 이미지를 가운데 정렬 */
  width: '100%',
  height: '100vh', /* 화면 전체 높이 */
  display: 'flex',
  justifyContent: 'center', /* 가로 중앙 정렬 */
  alignItems: 'center', /* 세로 중앙 정렬 */
}}>
  <div style={{
    width: '900px',
    height: '580px',
    backgroundColor: '#ffffff21;', /* 투명도 있는 흰색 배경 */
    backdropFilter: 'blur(5px)', /* 블러 처리 */
    padding: '20px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '3px solid #fff'
  }}>
    {/* Sign in과 Sign up */}
    <div style={{ marginBottom: '20px', color: '#ffffff', fontSize: '24px', display: 'flex', position: 'absolute', top: '-40px', right: '10px' }}>
      <div 
        style={{ marginRight: '20px', color: '#ffffff', fontSize: '24px', cursor: 'pointer', transition: 'color 0.3s', }}
        onClick={() => navigate('/login')} /* Sign in 클릭 시 로그인 페이지로 이동 */
        onMouseEnter={(e) => e.target.style.color = '#FF7F50'} /* 호버 시 폰트 컬러 변경 */
        onMouseLeave={(e) => e.target.style.color = '#ffffff'} /* 호버 빠져나오면 원래 폰트 컬러로 변경 */
      >
        Sign in
      </div>
    </div>

    <form onSubmit={handleSignup} style={{textAlign: 'center', margin: '100px'}}>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: '750px',
          height: '70px',
          marginBottom: '20px',
          padding: '0 25px',
          borderRadius: '35px',
          border: 'solid 3px #fff',
          fontSize: '1.2rem',
          background: 'none',
          color: '#fff'
        }}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '750px',
          height: '70px',
          margin: '15px 0px 15px',
          padding: '0 25px',
          borderRadius: '35px',
          border: 'solid 3px #fff',
          fontSize: '1.2rem',
          background: 'none',
          color: '#fff'
        }}
      />
      <button
        type="submit"
        style={{
          width: '805px',
          height: '70px',
          borderRadius: '35px',
          border: 'none',
          padding: '0 25px',
          backgroundColor: '#fff',
          color: '#000',
          fontSize: '1.4rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          margin: '90px'
        }}
      >
        Signup
      </button>
    </form>
  </div>
</div>
);
}


export default Signup;

   
