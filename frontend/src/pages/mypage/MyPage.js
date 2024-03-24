import React, {useEffect, useState} from 'react';
import apiRequest from '../../utils/axios';
import { useSelector } from 'react-redux';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />

const MyPage = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const [chattingHistory, setChattingHistory] = useState([]);

  
  

  useEffect(() => {
    const fetchChattingHistory = async () => {
      if (userId) {
        try {
          const response = await apiRequest.get(`http://localhost:8000/user/${userId}/chatting`);
          setChattingHistory(response.data);
        } catch (error) {
          console.error('채팅 내역 불러오기 실패', error);
        }
      }
    };

    fetchChattingHistory();
  }, [userId]);

  // useEffect(() => {
  //   const fetchLearningHistory = async () => {
  //     try {
  //       const response = await apiRequest.get('/mypage/chatting/detail');
  //       setLearningHistory(response.data);
  //     } catch (error) {
  //       console.error('학습 기록 또는 채팅 내역 불러오기 실패', error);
  //     }
  //   };
  //   fetchLearningHistory();
  // }, []);
  // useEffect(() => {
  //   const fetchLearningHistory = async () => {
  //     try {
  //       const response = await apiRequest.get('/mypage/chatting/detail');
  //       setChattingHistory(response.data);
  //     } catch (error) {
  //       console.error('학습 기록 또는 채팅 내역 불러오기 실패', error);
  //     }
  //   };
  //   fetchLearningHistory();
  // }, []);

  return (
    <div className="my-page-container" style={{textAlign: 'center'}}>
      <style>{`
        .my-page-container {
          display: flex;
        }

        .left-section {
          flex: 1;
          padding: 20px;
        }

        .right-section {
          flex: 1;
        }

        .profile-picture {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: lightgray; /* 프로필 이미지를 나타내는 div에 배경색을 추가하세요. */
          margin: 0 auto; /* 프로필 이미지를 수평 가운데로 정렬합니다. */
        }

        .member-info {
          margin-top: 20px;
          text-align: center; /* 회원 정보를 가운데 정렬합니다. */
        }

        .member-info h2 {
          margin: 0;
        }

        .member-info p {
          margin: 5px 0;
        }

        .grade-info {
            margin: 10px 50px 10px;
        }

        .learning-history {
          margin-top: 20px;
          background-color: #F6F1EB;
          width: 1095px;
          height: 500px;
          border-radius: 10px;
        
        }

        .history-box {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .history-item {
          width: calc(33.33% - 10px);
          margin: 5px;
          background-color: #fff;
          width: 310px;
          height: 290px;
        }
      `}</style>
      <div className="left-section">
        <div className='user_info' style={{margin: '50px', border: 'solid 1px #FF7F50', padding: '50px',margin: '157px 192px', borderRadius: '5px'}}>
      <div className="profile-picture">
        <img src="이미지_주소_또는_데이터" alt="프로필 이미지" />
      </div>
        <div className="member-info">
          <h2>회원 이름</h2>
          <p>E-mail 정보</p>
          <button style={{
            width: '150px',
            height: '50px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#FF7F50',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer'
          }}>
            로그아웃
            </button>
        </div>
      </div>
      </div>
      <div className="right-section">
        <div className='grade' style={{display: 'flex'}}>
        <h2>나의 등급</h2>
        <div className="grade-info">
          <p>등급 표시</p>
        </div>
        </div>
        {chattingHistory.length > 0 ? (
        <div>
          {chattingHistory.map((chat, index) => (
            <div key={index}>
              <p>{chat.date}</p>
              <p>{chat.chat}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>채팅 내역이 없습니다.</p>
      )}
        {/* {learningHistory.length > 0 ? (
          <div className="learning-history">
            <h3 style={{textAlign: 'center', padding: '20px'}}>학습기록</h3>
            <div className="history-box">
              
              {learningHistory.map((record, index) => (
                <div key={index} className="history-item">{record}</div>
              ))}
            </div>
            <div className='btn' style={{textAlign:'center', margin:'30px'}}>
            <button style={{
                width:'150px',
                height:'50px', 
                border:'none', 
                backgroundColor:'#FF7F50', 
                borderRadius: '5px',
                color: '#fff',
                fontSize: '18px',
                }}>
                    더 보기
            </button>
            </div>
          </div>
        ) : (
          <div className="learning-history" style={{textAlign: 'center', padding: '20px'}}>
            <div className='study_no' style={{margin: '50px'}}>
            <img src="/img/sad.png" alt="Your Image" style={{ width: '250px', height: 'auto' }} />
            <h3 style={{fontSize: '25px'}}>학습한 기록이 없습니다.</h3>
            </div>
          </div>
        )} */}
            <div className='grade-info' id='test_btn'>
          <button className='test_btn' style={{ width: '250px', height: '50px' , border:'none', borderRadius: '5px', fontSize: '18px', color: '#fff', backgroundColor: '#FF7F50', cursor: 'pointer'}}>테스트 보기</button>
          </div>
      </div>
    </div>
  );
}

export default MyPage;
