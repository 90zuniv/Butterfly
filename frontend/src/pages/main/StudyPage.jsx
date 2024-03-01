import Reract from 'react';
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";
// import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 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
function StudyPage() {

  const axios = require('axios');
  const OPENAI_API_KEY = 'your_openai_api_key_here';
  
  axios.post('https://api.openai.com/v1/completions', {
    model: "text-davinci-003", // 모델을 선택합니다. 사용 가능한 최신 버전으로 대체해야 할 수도 있습니다.
    prompt: "여기에 사용자의 질문을 입력하세요", // 사용자의 입력을 받아서 설정
    temperature: 0.7,
    max_tokens: 150,
  }, {
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    }
  }).then(response => {
    console.log(response.data);
    // 여기에서 클라이언트에 응답을 보냅니다.
  }).catch(error => {
    console.error(error);
  });
  const fetchResponse = async (userInput) => {
    const response = await fetch('/api/path', { // 서버의 특정 엔드포인트
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userInput }),
    });
  
    const data = await response.json();
    console.log(data);
  };
}

export default StudyPage;












  // axiosInstance.get(`${process.env.REACT_APP_BACKEND_URL}/member-service/member/`)
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const [message, setMessage] = useState("");
  // const [tarotResult, setTarotResult] = useState([]);

  // const sendToGpt = () => {
  //   if(localStorage.getItem("seq") === "7"){
  //     dispatch(setStateMessage(message));
  //     slideFromTarotToLoading();
  //     axiosInstance.post(`${process.env.REACT_APP_BACKEND_URL}/taro-service/tarot/test`,
  //       {memberSeq: localStorage.getItem("seq"),
  //         category: category,
  //       contentInput: message.message,
  //       cardSeqList: cardSeqList.toString(),
  //       contentList: null,
  //       imgUrl: null,
  //       videoUrl: null,
  //       story: null,}).then((res)=>{
  //         console.log(res);
  //         const results = res.data.contentList.split("$");
  //         setTarotResult(results);
  //         dispatch(setStateResults(results));
  //         dispatch(setStateStory(res.data.story));
  //         dispatch(setStateVideoUrl(res.data.videoUrl));
  //     })
  //     return
  //   }
  //   dispatch(setStateMessage(message));
  //   slideFromTarotToLoading();
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + process.env. ,
  //     },
  //   };
  //   function constructRequestMessage(localCategory, cards, msg) {
  //     return (
  //       "- Format : JSON \n\n " +
  //       "- Answer me in [한국어] \n\n" +
  //       "당신은 타로 전문가입니다. 아래의 순서로 진행합니다. \n\n " +
  //       `1. 다음 질문을 이해합니다. [질문] 저는 ${localCategory}에 대해 고민이 있습니다. ${msg} ` +
  //       `2. 저는 3개의 타로카드 ${cards}을 뽑았습니다. ` +
  //       "3. [질문]을 바탕으로 고른 카드를 해석한 뒤, 종합적으로 해석한 내용을 깊이있고 친절하게 작성합니다. [output.] " +
  //       "4. 마지막으로, 앞의 해석을 바탕으로, 500자 이내의 [동화]를 만들어주세요. 타로 내용을 직접적으로 언급하지 않고 은유적으로 작성해야합니다. [output.] " +
  //       "Please use the format template. Do not repeat answers. \n\n " +
  //       "---BEGIN FORMAT TEMPLATE--- \n\n " +
  //       // eslint-disable-next-line no-template-curly-in-string
  //       '{"해석": [${첫번째 카드 해석},  ${두번째 카드 해석},  ${세번째 카드 해석}, ${종합 해석}], "동화": ${동화}} \n\n' +
  //       "---END FORMAT TEMPLATE---"
  //     );
  //   }

  //   function constructSummaryRequestMessage(msg) {
  //     return "Extract keywords from this text: " + msg;
  //   }

  //   async function receiveTaroResultAndPicture() {
  //     const data = {
  //       model: "gpt-3.5-turbo",
  //       messages: [
  //         {
  //           role: "user",
  //           content: constructRequestMessage(
  //             category,
  //             stateCards.toString(),
  //             message.message
  //           ),
  //         },
  //       ],
  //       temperature: 0.7,
  //     };
  //     let jsonRes;
  //     await axios
  //       .post("https://api.openai.com/v1/chat/completions", data, config)
  //       .then((res) => {
  //         jsonRes = JSON.parse(res.data.choices[0].message.content);
  //         setTarotResult(jsonRes.해석);
  //         dispatch(setStateResults(jsonRes.해석));
  //         dispatch(setStateStory(jsonRes.동화.trim()));
  //       });

  //     const reqSummaryData = {
  //       model: "gpt-3.5-turbo",
  //       messages: [
  //         {
  //           role: "user",
  //           content: constructSummaryRequestMessage(jsonRes.동화),
  //         },
  //       ],
  //       temperature: 0.7,
  //     };
  //     let reqPicturePrompt = "";
  //     await axios
  //       .post(
  //         "https://api.openai.com/v1/chat/completions",
  //         reqSummaryData,
  //         config
  //       )
  //       .then((res) => {
  //         reqPicturePrompt =
  //           "simple drawing, fairytale style, " +
  //           res.data.choices[0].message.content;
  //       });

  //     const reqPictureData = {
  //       prompt: reqPicturePrompt,
  //       n: 1,
  //       size: "512x512",
  //     };
  //     let imgUrl;
  //     await axios
  //       .post(
  //         "https://api.openai.com/v1/images/generations",
  //         reqPictureData,
  //         config
  //       )
  //       .then((res) => {
  //         imgUrl = res.data.data[0].url;
  //         dispatch(setStateImgUrl(imgUrl));
  //       });

  //     const tarotResultDto = {
  //       memberSeq: localStorage.getItem("seq"),
  //       category: category,
  //       contentInput: message.message,
  //       cardSeqList: cardSeqList.toString(),
  //       contentList: jsonRes.해석.toString(),
  //       imgUrl: imgUrl,
  //       videoUrl: null,
  //       story: jsonRes.동화.trim(),
  //     };

  //     await axiosInstance
  //       .post(
  //         `${process.env.REACT_APP_BACKEND_URL}/taro-service/tarot/result`,
  //         tarotResultDto
  //       )
  //       .then((res) => {
  //         dispatch(setStateVideoUrl(res.data.videoUrl));
  //       });
  //   }

  //   receiveTaroResultAndPicture();
  // };
  
