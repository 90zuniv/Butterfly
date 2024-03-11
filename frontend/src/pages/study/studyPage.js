import React, { Fragment, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Link } from 'react-router-dom';

const playIconUrl = "/img/Playback.png";
const closeButtonUrl = "/img/CloseBtn.png";

function StudyPage() {

  const totalVideos = 8; // 예시로 8개의 인기 영상을 가정
  const videosToShow = 4; // 한 번에 보여질 비디오 수

  const [videoUrl, setVideoUrl] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0); // 현재 슬라이드 인덱스

  const videoLinks = [
    "https://youtu.be/QylMcP-q6-w?si=ReijqawRijsOtZ4n",
    "https://youtu.be/EiCmnIaj4u8?si=ztIhNy09HHoyeC5Z",
    "https://youtu.be/JY3rtZzsnHM?si=Pwl8JkrpzouKWFTy",
    "https://youtu.be/v-PjgYDrg70?si=7i1uXo6zyv2KzrGs",
    "https://youtu.be/wv5fWjD-mLI?si=3v1jX8alR4XvwgUR",
    "https://youtu.be/AJsvGtGgI6M?si=dcIS90HgofKAz1bC",
    "https://youtu.be/6W6MXVaSg1I?si=SotAyMhahMamhurW",
    "https://youtu.be/plkOJzGgRlo?si=hqbo04WOKnpyml5M"
  ];
  const videoThumbnails = [
    "/img/PSICK_SHOW.jpeg",
    "/img/insodeout.jpeg",
    "/img/annabelle.jpeg",
    "/img/toyStort.png",
    "/img/ddip.jpeg",
    "/img/Elemental.png",
    "/img/show.jpeg",
    "/img/sonny.jpeg", 
    // 나머지 썸네일 URL들...
  ];
  
  const videoTitles = [
    "[한글자막] JYP에게 게임을 묻다",
    "[인사이드 아웃 2] 메인 예고편",
    "[애나벨: 인형의 주인] 메인 예고편",
    "[토이스토리] 메인 예고편",
    "F는 이해불가",
    "행복해지는 엘리멘탈 OST:[가사/해석/lyrics]",
    "[한글자막] 크리스 프랫, 제임스 건에게 최고의 쇼에 초대된...",
    "손홍만 인터뷰"
  ];

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
    setSlideIndex((prevIndex) => (prevIndex === 0 ? totalVideos - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex >= totalVideos - 1 ? 0 : prevIndex + 1));
  };

  const getSlideStyle = (index) => ({
    transform: `translateX(-${slideIndex * (100 / videosToShow)}%)`,
    transition: 'transform 0.5s ease',
    flex: `0 0 ${100 / videosToShow}%`,
  });

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

          .popular-videos {
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
            width: 90%;
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
            transition: transform 0.3s ease, box-shadow 0.3s ease;
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
            width: 98%;
            margin-top: -20vh;
            z-index: 100;
          }

          button {
            font-size: 45px;
            cursor: pointer;
            border: none;
            background-color: #ffffff;
            width: 50px;
            border-radius: 50%;
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
      <div className='popular-videos'>
        <h2 style={{ textAlign: 'center'}}>🔥인기영상🔥</h2>
        <div className="video-list" style={{ display: 'flex', overflow: 'hidden' }}>
          {/* 각 비디오 썸네일 렌더링 */}
          {Array.from({ length: totalVideos }, (_, index) => (
          <div
          className="video-thumbnail"
          key={index}
          style={{ ...getSlideStyle(index), width: 310, height: 290 }}
          onClick={() => {
            const videoIndex = (index + slideIndex) % totalVideos;
            setVideoUrl(videoLinks[videoIndex]);
            setShowVideo(true);
          }}
        >
              {/* 여기에 썸네일 이미지, 제목, 설명 등을 렌더링합니다. */}
              <img src={videoThumbnails[(index + slideIndex) % totalVideos]} alt="썸네일 이미지" style={{height: 260 }} />
              <h3>{videoTitles[(index + slideIndex) % totalVideos]}</h3>
            </div>
          ))}
        </div>
        {/* 슬라이드 컨트롤 버튼 */}
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
