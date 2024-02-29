import React, { useState, useEffect } from 'react';

function EnglishStudyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    '/img/banner0.png',
    '/img/banner01.png', // 수정된 부분: public 폴더 내의 이미지 경로
    // banner1,
    // banner2
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const showBanner = (index) => {
    setCurrentIndex(index);
  };

  const showNextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const showPrevBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  return (
    <>
      <style>
        {`
        .banner {
          position: relative;
          width: 100%;
          height: 350px;
          overflow: hidden;
          background-color: #efefef;
          text-align: center;
        }

        .banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease;
        }

        .banner_title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 200px;
        }

        .study_1 {
          text-align: center;
          margin: 10em;
          background-image: url(../img/_Youtube_background.png);
          background-size: 100%;
          background-repeat: no-repeat;
          height: 690px;
          position: relative;
          overflow: hidden; /* 수정된 부분: 스크롤 막기 */
        }

        .study_1_text {
          margin-top: 20px;
          overflow-y: scroll; /* 수정된 부분: 텍스트가 넘칠 때 스크롤 나타나도록 */
          max-height: 200px; /* 수정된 부분: 최대 높이 지정 */
        }

        .btn_studdy {
          width: 240px;
          height: 100px;
          background-color: #FF7F50;
          font-size: 24px;
          color: #ffffff;
          border-radius: 50px;
          border: none;
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .boka img {
          width: 98%
        }

        .ContentFlex h1 {
          margin-top: 20px;
        }

        .content {
          text-align: center;
        }

        .ContentImg {
          background-image: url(../img/study01.png);
          background-size: cover;
          height: 690px;
          position: relative;
        }

        .button-container {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
        }

        .button {
          display: inline-block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          border: none;
          font-size: 1.5em;
          color: #000000;
          cursor: pointer;
        }

        .prevButton {
          position: absolute;
          left: 20px;
        }

        .nextButton {
          position: absolute;
          right: 20px;
        }

        .dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
        }

        .dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #888888;
          cursor: pointer;
          margin: 0 5px;
        }

        .dot.active {
          background-color: #000000;
        }
        `}
      </style>

      <div className="banner">
        <img src={banners[currentIndex]} alt="banner image" />
        <div className="button-container">
          <button className="button prevButton" onClick={showPrevBanner}>&lt;</button>
          <button className="button nextButton" onClick={showNextBanner}>&gt;</button>
        </div>
        <div className="dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => showBanner(index)}
            ></span>
          ))}
        </div>
      </div>
      <div className="study_1">
        <div className="study_1_text">
          영상 시청 후 Ai 튜터와 말하는 서비스
          Butterfly가 함께 합니다. 영어 실력을 향상시켜 보세요.
          링크 복사 후 붙혀 넣으면 AI가 인식 후 그에 맞는 영상으로 대화를 시작합니다!
          영어를 재미있게 배워보세요!
        </div>
      </div>
      <div className="boka">
        <img src="../img/boka.png" alt="banner" /> {/* 수정된 부분: 상대 경로를 사용하여 import한 이미지 */}
      </div>
      <div className="content">
        <div className="ContentImg">
          <div className="ContentFlex">
            <h1 className="banner_title">Butterfly와 함께, <br />배워봐요!</h1>
            <button className="btn_studdy">배우러 가기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnglishStudyPage;