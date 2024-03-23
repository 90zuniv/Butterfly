import React, { Fragment, useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../constants/api';
import apiRequest from '../../utils/axios';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />

const playIconUrl = "/img/Playback.png";
const closeButtonUrl = "/img/CloseBtn.png";
function StudyPage() {
  
  const navigate = useNavigate();
  const totalVideos = 8; // 예시로 8개의 인기 영상을 가정
  const videosToShow = 4; // 한 번에 보여질 비디오 수
  const [contentUrl, setContentUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0); // 현재 슬라이드 인덱스
  const [showModal, setShowModal] = useState(false);
  const [showChatButton, setShowChatButton] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  

  useEffect(() => {
    setShowModal(true);
    // 5초 후에 채팅 버튼으로 변경
    const timer = setTimeout(() => {
      setShowChatButton(true);
    }, 5000);
    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, []);

  useEffect(() => {
    setShowChatButton(!isAnalyzing); // 영상 분석중일 때는 채팅 버튼을 비활성화
  }, [isAnalyzing]);

  useEffect(() => {
    // 페이지가 로드되었을 때 모달창을 보이도록 설정
    setShowModal(true);
  }, []);

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

  const handleChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleSearch = async () => {
    setShowVideo(true);
    try{
      await apiRequest.post('/content/', {content_id : videoUrl});    
      console.log('비디오 URL 저장 성공:',);
    } catch (error) {
      console.error('비디오 URL 저장 실패:', error);
    }
    
  };
  

  

  const handleClose = () => {
    setShowVideo(false);
    setShowModal(false);
    setVideoUrl('');
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
            height: 550px
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
            width: calc(800px - 50px);
            height: 50px;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border: solid 5px #FF7F50;
            font-size: 24px;
            margin-bottom: 20px;
            padding-left: 15px;
            padding: 0px 15px;
          }
          .SearchBtn img {
            width: 25px; /* Adjust as needed */
            height: auto;
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
        <img src="/img/StudyBanner.png" alt="베너 이미지"/>
      </div>
      <div className='headerWrap' style={{height: '250px'}}>
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
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button
        className='SearchBtn'
        onClick={handleSearch} 
        style={{
          borderTopRightRadius: '5px',
          borderBottomRightRadius: '5px',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
          backgroundColor: '#FF7F50',
          width:'100px',
          height:'60px',
          border:'none', }}>
          <img src="/img/image 46.png"alt='Search'
          style={{
            margin: '15px'
          }}
          />
          </button>
          </div>
      </div>
      <div className='popular-videos'>
        <h2 style={{ textAlign: 'center'}}>🔥인기영상🔥</h2>
        <div className="video-list" style={{ display: 'flex', overflow: 'hidden', backgroundColor: '#4b5a7a', height: '450px', width: '100%'}}>
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
          // onMouseEnter={(e) => {
          //   e.target.style.transform = 'scale(3.0)'; // 마우스 hover시 크기 확대
          //   e.target.style.transition = 'transform 0.3s ease';
          // }}
          // onMouseLeave={(e) => {
          //   e.target.style.transform = 'scale(1)';
          // }}
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
      {showModal && (
          <div className="modal" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* 닫기 버튼 클릭 시 handleClose 함수 호출 */}
              <div className="close-button" onClick={(e) => { e.stopPropagation(); handleClose(); }}></div>
              <h2 style={{ textAlign: 'center'}}>⭐️ Image ⭐️</h2>
              {/* 이미지를 추가하세요 */}
              <img src="/your-image-url.jpg" alt="Your Image" style={{ width: '100%', height: 'auto' }} />
              {/* 닫는 창을 추가하세요 */}
            </div>
          </div>
        )}
        {showModal && (
          <div className="modal" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* 닫기 버튼 클릭 시 handleClose 함수 호출 */}
              <div className="close-button" onClick={(e) => { e.stopPropagation(); handleClose(); }}></div>
              <h2 style={{ textAlign: 'center'}}>⭐️ 사용방법 ⭐️</h2>
              {/* 이미지를 추가하세요 */}
                <p style={{textAlign: 'center', fontSize: '18px'}}>
                  유튜브에서 공유하기 클릭 후 링크를 넣어주세요!
                </p>
              <img src="/img/사용법.png" alt="Your Image" style={{ width: '100%', height: 'auto' }} />
              {/* 닫는 창을 추가하세요 */}
            </div>
          </div>
        )}

      {showVideo && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="close-button" onClick={handleClose}></div>
            <h2 style={{ textAlign: 'center', margin: '0px 0px 10px'}}>⭐️ Video ⭐️</h2>
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