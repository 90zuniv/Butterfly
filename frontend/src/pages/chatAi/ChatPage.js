import React, { useState } from 'react';

function ChatPage() {
  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = (text) => {
    if (text.trim() === '') return; // 빈 메시지 전송 방지

    const newMessage = { text, fromUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (text.trim() === 'hi~!') {
      // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
      setTimeout(() => {
        const replyMessage = { text: 'Hello how are you ?', fromUser: false };
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
      }, 1000);
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
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleMessageSubmit(e.target.value);
              e.target.value = ''; // 메시지 전송 후 입력 필드 비우기
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.querySelector('input[type="text"]');
            handleMessageSubmit(input.value);
            input.value = ''; // 메시지 전송 후 입력 필드 비우기
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
    </div>
  );
}

export default ChatPage;
