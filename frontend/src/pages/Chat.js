import React, { useState } from 'react';
import apiRequest from 'axios';
import classNames from 'classnames/bind';
// cx 함수가 어떻게 정의되었는지 모르므로 classNames.bind를 사용하는 방식으로 가정합니다.
// 여기에 해당하는 스타일시트 import가 필요할 수 있습니다. 예: import styles from './Chat.module.css';
// const cx = classNames.bind(styles);

const Chat = () => {
    const [userMsg, setUserMsg] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = () => {
    setChatLog(prevChatLog => [
        ...prevChatLog,
        { type: "user", message: userMsg },
    ]);
    sendMessage(userMsg);
    setUserMsg("");
};

    const sendMessage = async (message) => {
    const url = "/api/chat";
    const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 1.0,
        max_tokens: 100,
    };

    setIsLoading(true);

    await apiRequest.post(url, data)
        .then((response) => {
            setChatLog(prevChatLog => [
            ...prevChatLog,
            { type: "bot", message: response.data.choices[0].message.content },
            ]);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    return (
        <ul className={classNames("feed")}>
        {chatLog.map((chat, index) => (
            <li
            key={index}
            className={classNames("chat", { user: chat.type === "user" })}
            >
            {chat.message}
            </li>
        ))}
        {isLoading && (
            <li key={chatLog.length} className={classNames("chat")}>
            Loading...
            </li>
        )}
        </ul>
    );
};

export default Chat;