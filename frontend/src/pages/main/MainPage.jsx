import React from 'react';

function EnglishStudyPage() {
  const redirectToStudyPage = () => {
    // StudyPage로 이동하는 로직 추가
    window.location.href = '/StudyPage';
  };

  const styles = {
    container: {
      backgroundImage: "url('/img/newworkcity.png')",
      backgroundSize: 'cover',
      height: '100vh',
      backgroundColor: 'rgb(246, 241, 235)',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    header: {
      textAlign: 'center',
      margin: '100px 30px'
    },
    title: {
      fontSize: '64px',
      color: 'white',
    },
    subtitle: {
      fontSize: '30px',
      color: 'white',
      marginTop: '10px',
    },
    buttonContainer: {
      textAlign: 'center',
      margin: '100px 30px'
    },
    button: {
      width: '200px',
      height: '70px',
      border: '4px solid white',
      borderRadius: '50px',
      backgroundColor: 'transparent',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#fff',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{margin: '0px', 
                    color: '#fff',
                    fontSize: '64px',
                    margin: '0px 0px'}}>AI와 함께하는 영어 능력 향상</h1>
        <p style={{margin: '0px 0px 0px -280px', 
                   color: '#fff',
                   fontSize: '30px',}}>유창한 영어 학습의 시작을 함께 해보세요</p>
      </div>
      <div style={styles.buttonContainer}>
        <button className='study_btn' style={styles.button} onClick={redirectToStudyPage}>
          Go learn
        </button>
        
      </div>
    </div>
  );
}

export default EnglishStudyPage;
