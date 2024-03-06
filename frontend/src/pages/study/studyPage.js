import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const playIconUrl = "/img/Playback.png";

function StudyPage() {
  const [startIndex, setStartIndex] = useState(0);
  const totalVideos = 4; // 예시로 4개의 인기 영상을 가정합니다.


  const moveLeft = () => {
    setStartIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalVideos - 1));
  };

  const moveRight = () => {
    setStartIndex((prevIndex) => (prevIndex < totalVideos - 1 ? prevIndex + 1 : 0));
  };

  return (
    <Fragment>
      <style>
        {`
          /* CSS 스타일 */
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

          .popular_videos {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
          }

          .video-list {
            display: flex;
            justify-content: space-around;
            align-items: center;
            transition: transform 0.5s ease;
            transform: translateX(-${startIndex * 290}px);
            width: 98%;
          }

          .video-thumbnail {
            width: 270px;
            height: 350px;
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
            width: 240px;
            height: 130px;
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
        `}
      </style>
      <div className="banner">
        <img src="/img/StudyBanner.jpeg" alt="베너 이미지"/>
      </div>
      <div className="header">
        <h2 style={{ textAlign: 'center' }}>🌈️ 유튜브 링크를 넣어주세요 🌈️</h2>
      </div>
      <div className="search">
        <input type="text" placeholder="링크를 입력하세요" className='SearchBox'/>
        <button className='SearchBtn'>검색</button>
      </div>
      <div className="popular_videos">
        <h2 style={{ textAlign: 'center'}}>⭐️ 인기영상 ⭐️</h2>
        <div className="video-list">
          {Array.from({ length: totalVideos * 2 }, (_, index) => {
            const videoIndex = index % totalVideos; // 인덱스를 요소의 실제 인덱스로 변환합니다.
            return (
              <div className="video-thumbnail" key={index}>
                <img src="썸네일 URL" alt="썸네일" />
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
          <button onClick={moveLeft}>&lt;</button>
          <button onClick={moveRight}>&gt;</button>
        </div>
      </div>
    </Fragment>
  );
}

export default StudyPage;
