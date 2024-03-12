import React, { useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleMyPage = () => {
    if (isLoggedIn) {
      // My Page 이동 로직 추가
    } else {
      alert('로그인이 필요한 기능입니다.');
    }
  };

  return (
    <header style={{ backgroundColor: '#F6F1EB', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{margin: '10px 50px'}}>
        <img src="/img/ButterFlyLog.png" alt="Logo" style={{ width: '150px', height: 'auto' }} />
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <img src="/img/MyPage.png" alt="My Page" style={{ width: '30px', height: '30px', marginRight: '10px', cursor: 'pointer' }} onClick={handleMyPage} />
            <img src="/img/study.png" alt="Study Page" style={{ width: '30px', height: '30px', marginRight: '10px', cursor: 'pointer' }} onClick={handleMyPage} />
            <img src="/img/logout.png" alt="Logout" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={handleLogout} />
          </>
        ) : (
          <img src="/img/login.png" alt="Login" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={handleLogin} />
        )}
      </div>
    </header>
  );
};

export default Header;
