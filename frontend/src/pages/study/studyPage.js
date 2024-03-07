import React, { Fragment, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Link } from 'react-router-dom';

const playIconUrl = "/img/Playback.png";
const closeButtonUrl = "/img/CloseBtn.png";

function StudyPage() {
  const totalVideos = 8; // 예시로 8개의 인기 영상을 가정

  const [videoUrl, setVideoUrl] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0); // 현재 슬라이드 인덱스

  const handleChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleSearch = () => {
    setShowVideo(true);
  };

  const handleClose = () => {
    setShowVideo(false);
  };

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === 0 ? totalVideos - 4 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === totalVideos - 4 ? 0 : prevIndex + 1));
  };

  return (
    <Fragment>
      <style>
        {`
          /* CSS 스타일 */

          /* 이전 버튼 애니메이션 */
          @keyframes slideLeft {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          /* 다음 버튼 애니메이션 */
          @keyframes slideRight {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          .banner img {
            width: 100%;
          }

          .header {
            text-align: center;
          }
          
          .search {
            display: flex;
            text-align: center;
            justify-content: center;
          }

          .SearchBox {
            width: 800px;
            height: 50px;
            border-radius: 10px;
            border: solid 5px #FF7F50;
            font-size: 24px;
            margin-bottom: 20px;
            padding: 0px 15px 0px;
          }

          .SearchBtn {
            height: 60px;
            width: 100px;
            border-radius: 10px;
            border: solid 5px #FF7F50;
            background-color: #FF7F50;
            color: #ffffff;
            font-size: 40px;
            cursor: pointer;
          }

          .SearchBtn::before {
            font-size: 30px;
            margin-right: 10px;
          }

          .best {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
          }

          .video-list {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 98%;
            overflow: hidden; /* 넘치는 부분 감추기 */
            position: relative; /* 애니메이션을 위한 상대 위치 설정 */
          }

          .video-list-animation {
            animation: slideLeft 0.5s forwards; /* 애니메이션 적용 */
          }

          .video-list.reverse {
            flex-direction: row-reverse;
          }

          .video-thumbnail {
            width: 98%;
            height: auto;
            background-color: #efefef;
            margin-right: 55px;
            margin-left: 55px;
            margin-bottom: 20px;
            border-radius: 5px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .video-thumbnail img {
            width: 100%;
            height: auto;
          }

          .video-thumbnail h3, .video-thumbnail p {
            text-align: center;
          }

          .video-thumbnail button {
            width: 140px;
            height: 50px;
            background-color: #ffffff;
            border: 5px solid #FF7F50;
            border-radius: 5px;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            width: 270px;
            margin-top: 10px;
          }

          button {
            font-size: 20px;
            cursor: pointer;
          }

          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .modal-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 80%;
            max-height: 90%;
            overflow-y: auto;
            position: relative;
          }

          .modal-content .video-player {
            position: relative;
            padding-top: 56.25%;
          }

          .modal-content .video-player iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .go-to-chat-button {
            text-align: center;
            margin-top: 20px;
          }

          .go-to-chat-button a {
            font-size: 24px;
            color: #FF7F50;
            text-decoration: none;
            border: 2px solid #FF7F50;
            padding: 10px 20px;
            border-radius: 5px;
            transition: all 0.3s ease;
          }

          .go-to-chat-button a:hover {
            background-color: #FF7F50;
            color: #ffffff;
          }

          .close-button {
            position: absolute;
            top: 35px;
            right: 50px;
            width: 30px;
            height: 30px;
            background-image: url(${closeButtonUrl});
            background-size: cover;
            cursor: pointer;
          }
        `}
      </style>
      
      <div className="banner">
        <img src="/img/StudyBanner.jpeg" alt="베너 이미지"/>
      </div>
      <div className="header">
        <h2 style={{ textAlign: 'center' }}>🌈️ 유튜브 링크를 넣어주세요 🌈️</h2>
      </div>
      <div className="search">
        <input 
          type="text" 
          placeholder="링크를 입력하세요" 
          className='SearchBox'
          value={videoUrl}
          onChange={handleChange}
        />
        <button className='SearchBtn' onClick={handleSearch}>검색</button>
      </div>
      <div className='best'>
        <h2 style={{ textAlign: 'center'}}>🔥인기영상🔥</h2>
        <div className={`video-list ${slideIndex !== 0 ? 'video-list-animation' : ''}`}>
          {Array.from({ length: 4 }, (_, index) => {
            const videoIndex = (index + slideIndex) % totalVideos;
            return (
              <div className="video-thumbnail" key={index}>
                <img src={`썸네일 URL ${videoIndex}`} alt="썸네일" />
                <h3>영상 제목</h3>
                <p>타이틀</p>
                <div className='Playback_'>
                  <button style={{ border: 'none'}}>시청하기
                    <img src={playIconUrl} alt="재생" style={{ width: '25px', height: '25px', margin: '0px 10px'}}/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="button-container">
          <button onClick={handlePrevSlide}>{'<'}</button>
          <button onClick={handleNextSlide}>{'>'}</button>
        </div>
      </div>
      
      {showVideo && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-button" onClick={handleClose}></div>
            <h2 style={{ textAlign: 'center'}}>⭐️ Video ⭐️</h2>
            <div className="video-list">
              <div className="video-thumbnail">
                <div className="video-player">
                  <ReactPlayer url={videoUrl} controls={true} width="100%" height="100%" />
                </div>
              </div>
            </div>
            <div className="go-to-chat-button">
              <Link to="/ChatPage">
                채팅하러 가기
              </Link>
            </div>
          </div>
        </div>
      )}

    </Fragment>
  );
}

export default StudyPage;
