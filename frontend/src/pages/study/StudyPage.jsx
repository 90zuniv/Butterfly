import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function studyPage() {
  return (
    <Fragment>
      <div className="header">
        <h2>🌈️ 유튜브 링크를 넣어주세요 🌈️</h2>
      </div>
      <div className="search">
        <input type="text" placeholder="링크를 입력하세요" />
        <button>검색</button>
      </div>
      <div className="popular-videos">
        <h2>⭐️ 인기영상 ⭐️</h2>
        <div className="video-list">
          <div className="video-thumbnail">
            <img src="썸네일 URL" alt="썸네일" />
            <h3>영상 제목</h3>
            <p>타이틀</p>
            <button>시청하기</button>
          </div>
          {/* 여기에 더 많은 VideoThumbnail 추가 */}
        </div>
      </div>
    </Fragment>
  );
}

export default studyPage;