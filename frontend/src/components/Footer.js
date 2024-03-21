import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#111',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      bottom: 0,
      width: '100%',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    info: {
      fontSize: '14px',
    },
  };

  return (
    <div style={{ marginTop: 'auto' }}>
      <footer style={styles.footer}>
        <div style={styles.logo}>로고</div>
        <div style={styles.info}>
          Butterfly | 대표이사: 김민범, 박균탁, 나윤정, 박지수
        </div>
        <div>© 90’z</div>
      </footer>
    </div>
  );
};

export default Footer;