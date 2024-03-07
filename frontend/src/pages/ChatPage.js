import React, { useState } from 'react';
import axios from 'axios';

function CreateChat() {
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const chatData = {
      content: content,
      thumbnail: thumbnail,
      user_id: parseInt(userId, 10),
    };

    try {
      // `axios.post` 메서드를 사용하여 채팅 데이터를 FastAPI 백엔드로 보냅니다.
      const response = await axios.post('http://localhost:8000/chatting/', chatData);
      // 성공적으로 데이터를 보냈을 때의 처리
      console.log('Chatting created successfully', response.data);
    } catch (error) {
      // 오류 처리
      console.error('Error creating chatting:', error.response ? error.response.data : error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <input
        type="text"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        placeholder="Thumbnail URL"
      />
      <input
        type="number"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateChat;
