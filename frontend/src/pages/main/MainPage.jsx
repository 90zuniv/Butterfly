import React, { useEffect, useState } from 'react';

function EnglishStudyPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 텍스트가 서서히 나타나도록 설정
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
  }, []);

  const redirectToStudyPage = () => {
    // StudyPage로 이동하는 로직 추가
    window.location.href = '/StudyPage';
  };

  const styles = {
    container: {
      backgroundImage: "url('/img/newworkcity.png')",
      backgroundSize: 'cover',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'rgb(246, 241, 235)',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    header: {
      textAlign: 'center',
      margin: '100px 60px',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 1s ease',
    },
    title: {
      fontSize: '64px',
      color: '#fff',
      margin: '0',
      animation: isVisible ? 'fadeInTitle 1s ease' : '',
    },
    subtitle: {
      fontSize: '30px',
      color: '#fff',
      margin: '0 0 0 -285px',
      animation: isVisible ? 'fadeInSubtitle 1s ease' : '',
      animationDelay: isVisible ? '0.5s' : '1.5s',
      position: 'relative'
    },
    buttonContainer: {
      textAlign: 'center',
      margin: '50px 30px'
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
      transition: 'color 0.3s, background-color 0.3s', // 폰트색과 배경색에 대한 전환 효과 추가
    },
  };

  const buttonHoverStyles = {
    color: '#111', // 호버시 폰트색 변경
    backgroundColor: '#fff', // 호버시 배경색 변경
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeInTitle {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
            animation-fill-mode: none;
          }

          @keyframes fadeInSubtitle {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
            animation-fill-mode: none;
          }
          .box {
            padding: 25px;
            height: 300px;
            backdrop-filter: blur(3px);
          }
        `}
      </style>
      <div style={styles.header}>
        <div className="fadeInWrapper">
          <h1 style={styles.title}>
            AI와 함께하는 영어 능력 향상
          </h1>
        </div>
        <div className="fadeInWrapper">
          <p style={styles.subtitle}>
            유창한 영어 학습의 시작을 함께 해보세요
          </p>
        </div>
      </div>
      <div style={styles.buttonContainer}>
        <button 
          className='study_btn' 
          style={styles.button}
          onClick={redirectToStudyPage}
          onMouseOver={(e) => {
            e.target.style.color = buttonHoverStyles.color;
            e.target.style.backgroundColor = buttonHoverStyles.backgroundColor;
          }}
          onMouseOut={(e) => {
            e.target.style.color = styles.button.color;
            e.target.style.backgroundColor = styles.button.backgroundColor;
          }}
        >
          Go learn
        </button>
      </div>
      <div className='box_all' style={{
          position: 'absolute',
          top: '350px',
          left: '35px',
          display: 'flex',
          marginTop: '180px',
          width: '90%'}}>
        <div className='box' style={{
          width: '70%',
          border: 'solid 3px #fff',
          borderRadius: '30px'
        }}>
          <h2 style={{color: '#fff', paddingLeft: '15px'}}>
            YouTube 영상으로 영어 대화
          </h2>
          <p style={{color: '#fff', fontSize: '18px', paddingLeft: '15px'}}>
          사용자가 입력한 YouTube 영상 링크를 활용하여<br/>
          영어 대화를 생성합니다. <br/>
          사용자가 링크를 입력하면,<br/>
          사이트는 영상을 분석하여 내용을 이해하고, <br/>
          그에 따라 자연스럽고 의미 있는<br/>
          영어 대화를 생성합니다. <br/>
          이를 통해 사용자는 관심 있는<br/>
          영상의 내용을 바탕으로 <br/>
          실제 대화를 나누는 경험을 할 수 있습니다.
          </p>
        </div>
        <div className='box' style={{
          width: '70%',
          border: 'solid 3px #fff',
          borderRadius: '30px',
          margin: '0px 70px'
        }}>
          <h2 style={{color: '#fff', paddingLeft: '15px'}}>
          SERVICE
          </h2>
          <p style={{color: '#fff', fontSize: '18px', paddingLeft: '15px'}}>
          Butterfly는 영어가 필요한<br/>
          모든 사람들에게영어공부가<br/>
          의무감이나 압박으로 느껴지지 않고<br/>
          AI 튜터와 이야기 함으로써<br/>
          재미있게 배울 수 있고,<br/>
          회화 실력을 향상시켜<br/>
          영어공부에 거부감을 줄이는 서비스 입니다.
          </p>
        </div>
        <div className='box' style={{
          width: '70%',
          border: 'solid 3px #fff',
          borderRadius: '30px'
        }}>
          <h2 style={{color: '#fff', paddingLeft: '15px'}}>
          사용자 맞춤
          </h2>
          <p style={{color: '#fff', fontSize: '18px', paddingLeft: '15px'}}>
         사용자 영어 실력에 따라<br/>
         AI가 판단을 하고 레벨이 조정됩니다<br/>
         보다 쉽고, 재미있게 영어를 배워보세요
          </p>
        </div>
      </div>
    </div>
  );
}

export default EnglishStudyPage;