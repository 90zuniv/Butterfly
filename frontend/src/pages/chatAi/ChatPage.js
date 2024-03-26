import React, { useState, useEffect, useRef, } from 'react';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 추가
  const [level, setLevel] = useState('A1');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // 초기 메시지 추가
    const initialMessage = { text: "Hello! How was it?", fromUser: false };
    setMessages([initialMessage]);
    // 스크롤을 최하단으로 이동시키는 함수를 호출합니다.
    scrollToBottom();
  }, []); 

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSubmit = (text) => {
    if (text.trim() === '') return; // 빈 메시지 전송 방지

    const newMessage = { text, fromUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // if (text.trim() === 'It will effect my decision') {
    //   // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
    //   setTimeout(() => {
    //     const replyMessage = { text: "It seems like there's a small mistake in your sentence. You should say, 'It will affect my decision.' The word 'affect' is the correct verb to use when talking about something influencing something else. Now, how has your day been so far?", fromUser: false };
    //     setMessages((prevMessages) => [...prevMessages, replyMessage]);
    //   }, 1000);
    // }
    // if (text.trim() === 'I bought a leather Italian beautiful belt') {
    //   // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
    //   setTimeout(() => {
    //     const replyMessage = { text: "You've got a great sentence there, but let's adjust the order of the adjectives to match standard English conventions. It should be, 'I bought a beautiful Italian leather belt.' Remember, the order of adjectives in English typically follows the pattern of opinion-size-age-shape-color-origin-material-purpose. How do you like your new belt?", fromUser: false };
    //     setMessages((prevMessages) => [...prevMessages, replyMessage]);
    //   }, 1000);
    // // }
    // if (text.trim() === 'fine') {
    //   // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
    //   setTimeout(() => {
    //     const replyMessage = { text: "I'm glad to hear you're doing fine! Today, we're going to talk about a very interesting video that includes several plots. The first part of the video shows various scenes of people in different settings, such as a woman at a desk with a microphone, a man at an office desk, and several scenes of a man singing into a microphone. It also includes scenes from a restaurant with green walls and people wearing green hats and shirts, which seems to create a vibrant and lively atmosphere. What do you think the significance of the color green in these scenes might be?", fromUser: false };
    //     setMessages((prevMessages) => [...prevMessages, replyMessage]);
    //   }, 1000);
    // }
    // if (text.trim() === 'It will effect my decision') {
    //   // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
    //   setTimeout(() => {
    //     const replyMessage = { text: "It will affect my decision. Could you share how the color green might influence your decision or feelings towards these scenes?", fromUser: false };
    //     setMessages((prevMessages) => [...prevMessages, replyMessage]);
    //   }, 1000);
    // }
    // if (text.trim() === 'He admits to have done it himself') {
    //   // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
    //   setTimeout(() => {
    //     const replyMessage = { text: "He admits to having done it himself. How do you think this admission impacts the story or the character's development?", fromUser: false };
    //     setMessages((prevMessages) => [...prevMessages, replyMessage]);
    //   }, 1000);
    // }
    if (text.trim() === 'It was good') {
      // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
      setTimeout(() => {
        const replyMessage = { text: "It was good? That's great to hear! Let's dive into our discussion for today. We'll start with the first plot summary, which revolves around various scenes involving individuals in different settings, such as a woman at a desk with a microphone, a man at an office desk, and several instances of a man singing into a microphone. There's also a significant focus on a young man wearing a green hat and shirt, looking at a pizza, and various other scenes that depict daily life and work in a restaurant. This plot seems to weave together moments of work, passion, and everyday occurrences. What do you think the significance of the color green and the repeated scenes of singing into a microphone might be in this context?", fromUser: false };
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
      }, 1000);
    }
    if (text.trim() === 'He admits having done it himself') {
      // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
      setTimeout(() => {
        const replyMessage = { text: "He admits having done it himself? That's an interesting observation. It seems like you're touching on themes of responsibility and confession. In the context of our video summary, where various characters are depicted in their daily lives and work, admitting to having done something oneself could symbolize personal growth or accountability. How do you think this theme of personal responsibility plays out in the everyday scenarios depicted, such as the young man with the green hat and shirt or the individuals singing into the microphone?", fromUser: false };
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
      }, 1000);
    }
    if (text.trim() === 'It will affect my decision') {
      // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
      setTimeout(() => {
        const replyMessage = { text: "It will affect my decision? Certainly, the idea of actions and decisions affecting outcomes is a crucial theme. Considering the plots we've discussed, especially the second one where a sandwich store worker develops feelings for a customer, decisions and their impacts are central. The worker's decision to pretend not to remember the customer's preferences just to extend their interaction is quite telling. How do you think the concept of decisions shaping our lives is reflected in these narratives, particularly in the context of personal relationships and work environments?", fromUser: false };
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
      }, 1000);
    }
    if (text.trim() === 'Fine') {
      // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
      setTimeout(() => {
        const replyMessage = { text: "I'm glad to hear you're doing fine! Today, we're going to discuss a video that has two main plots. The first plot revolves around various scenes involving a man singing into a microphone in different settings, and a young man wearing a green hat and shirt looking at a pizza, among other scenes. It paints a picture of performance and daily life. The second plot is a touching story shared on a radio show by DJ Yong, about a part-timer at a barbecue restaurant and another story about a young man working in a sandwich store, developing feelings for a regular customer. Both stories explore themes of misunderstanding, unrequited love, and the small moments that make up our daily lives. How do you think these plots relate to each other, and what do you feel about the stories shared by DJ Yong?", fromUser: false };
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
      }, 1000);
    }
    if (text.trim() === 'I bought a leather Italian beautiful belt') {
      // 사용자가 'Hi~!'를 보낸 경우에만 자동으로 답장 보내기
      setTimeout(() => {
        const replyMessage = { text: "I bought a...? It sounds like you've made a lovely purchase! Italian leather is renowned for its quality and beauty. How does this new belt fit into your wardrobe, and what inspired you to choose this particular item?", fromUser: false };
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
      }, 1000);
    }

    // "End" 또는 "Thank you"가 입력되면 모달 열기
    if (text.trim().toLowerCase() === 'end' || text.trim().toLowerCase() === 'thank you') {
      openModal();
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  const handleConfirm = () => {
    navigate('/');
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
      <div className='end_chat' style={{textAlign: 'center'}}>
        <h3 style={{fontSize:'18px', color: 'red'}}>"End" 혹은 "Thank you" 라고 채팅을 입력하면 채팅이 자종으로 종료 됩니다.</h3>
        <button type='submit' onClick={openModal} style={{ // 모달 열기 함수로 변경
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
            <button onClick={handleConfirm} style={{
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
