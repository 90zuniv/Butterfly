import React, { useState, useEffect, useRef } from 'react';
import apiRequest from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 추가
  const [level, setLevel] = useState('A1');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (inputText.trim() === '') return;

    try {
      await apiRequest.post('http://localhost:8000/chatting/', {
        chat: inputText,
        user_id: userId,        
        date: new Date().toISOString()
        
      });
      console.log(userId)
      // 성공적으로 메시지를 보낸 후에는 메시지 목록 업데이트
      setMessages([...messages, { text: inputText, fromUser: true }]);
  
      setInputText('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', margin: '100px' }}>
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '10px',
          width: '100%',
          maxWidth: '90%', // 최대 너비 지정
          border: 'solid 1px',
          borderRadius: '10px',
          height: '500px',
          backgroundColor: '#fff'
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: message.fromUser ? 'flex-end' : 'flex-start',
              marginBottom: '5px',
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: message.fromUser ? '#fff' : '#FF7F50',
                border: 'solid 1px #111',
                marginRight: message.fromUser ? '5px' : 0, // 오른쪽 마진 추가
                marginLeft: message.fromUser ? 0 : '5px', // 왼쪽 마진 추가
                color: message.fromUser ? '#111' : '#fff',
                borderColor: message.fromUser ? '#111' : '#FF7F50'
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='textWrap' style={{display: 'flex'}}>
        <input
          type="text"
          placeholder="Type your message..."
          style={{
            marginTop: '10px',
            padding: '5px',
            width: '760px', // 수정된 너비
            maxWidth: '90%', // 최대 너비 지정
            fontSize: '18px',
            border: '1px solid',
            borderRadius: '5px'

          }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleMessageSubmit(inputText);
              setInputText(''); // 메시지 전송 후 입력 필드 비우기
            }
          }}
        />
        <button
          onClick={() => {
            handleMessageSubmit(inputText);
            setInputText(''); // 메시지 전송 후 입력 필드 비우기
          }}
          style={{ marginTop: '10px',
                  width: '150px',
                  padding: '5px',
                  backgroundColor: '#FF7F50',
                  border: 'none',
                  borderRadius: '5px',
                  height: '50px',
                  fontSize: '18px',
                   color: '#ffffff' }} // 수정된 너비
        >
          Send
        </button>
      </div>
      <div className='end_chat' style={{textAlign: 'center'}}>
        <h3 style={{fontSize:'18px', color: 'red'}}>"End" 혹은 "Thank you" 라고 채팅을 입력하면 채팅이 자종으로 종료 됩니다.</h3>
        <button type='submit' onClick={() => setIsOpen(true)} style={{ // 모달 열기 함수로 변경
          width: '150px',
          height: '50px',
          border: 'none',
          backgroundColor: '#FF7F50',
          borderRadius: '5px',
          fontSize: '18px',
          color: '#fff'
          }}>채팅 종료</button>
      </div>

      {/* 모달 */}
      {isOpen && (
        <div className="modal" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}>
          <div className="modal-content" style={{
            width: '90%',
            maxWidth: '600px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <p style={{
              textAlign: 'center',
              fontSize: '23px',
              color: '#111'
            }}>채팅이 종료되었습니다.</p>
            <div className='end_chat' style={{textAlign: 'center'}}>
            <img src="/img/end.png" alt="채팅 종료" style={{width: '250px'}}/>
            </div>
            <p style={{
              fontSize: '18px',
              color: '#111',
              textAlign: 'center'
            }}>레벨 등급: {level}</p> {/* 여기서 level은 사용자 레벨을 표시하는 변수 */}
            <div style={{textAlign: 'center'}}>
            <button onClick={() => navigate('/')} style={{
            padding: '10px 20px',
            backgroundColor: '#FF7F50',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px'
          }}>확인</button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;