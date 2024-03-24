import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/authReducer';


const Header = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // logout 액션을 디스패치하여 사용자 로그아웃 처리
    navigate("/"); // 로그아웃 후 메인 페이지로 이동
  };

  return (
    <header style={{ backgroundColor: '#F6F1EB', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{margin: '10px 50px'}}>
        <img src="/img/ButterFlyLog.png" alt="Logo" style={{ width: '150px', height: 'auto' }} onClick={() => navigate("/")}/>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <img src="/img/MyPage.png" alt="My Page" style={{ width: '30px', height: '30px', marginRight: '10px', cursor: 'pointer' }} onClick={() => navigate("/mypage")} />
            <img src="/img/study.png" alt="Study Page" style={{ width: '30px', height: '30px', marginRight: '10px', cursor: 'pointer' }} onClick={() => navigate("/studypage")} />
            <img src="/img/logout.png" alt="Logout" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={handleLogout} />
          </>
        ) : (
          <img src="/img/login.png" alt="Login" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => navigate("/login")} />
        )}
      </div>
    </header>
  );
};

export default Header;
