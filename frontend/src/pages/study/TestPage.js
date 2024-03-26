import React, { useState, useEffect  } from 'react';
import apiRequest from '../../utils/axios';
import api from '../../constants/api';
import { useNavigate } from 'react-router-dom';
const TestPage = () => {
  // 가상으로 가져온 문제 및 선택지
  const [isOpen, setIsOpen] = useState(false);
  const [level, setLevel] = useState('B1');
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const questions = [
    {
      id: 1,
      question: "What ___________ your name?",
      options: ["is", "am", "are", "정확히 모르겠음"],
      answer : ["is"],
    },
    {
      id: 2,
      question: "He has ___________ house in Paris.",
      options: ["any", "a", "an", "정확히 모르겠음"],
      answer : ["a"],
    },
    {
      id: 3,
      question: "I work in a ___________. I’m a nurse.",
      options: ["hospital", "hotel", "supermarket", "정확히 모르겠음"],
      answer : ["hospital"],
    },
    {
      id: 4,
      question: "This is my brother. ___________ name is Paul.",
      options: ["His", "Her", "He's", "정확히 모르겠음"],
      answer : ["His"],
    },
    {
      id: 5,
      question: "___________ many people in the park.",
      options: ["They are", "There is", "There are", "정확히 모르겠음"],
      answer : ["They are"],
    },
    {
      id: 6,
      question: "I go to school  ___________ 7 o’clock in the morning.",
      options: ["for", "at", "in", "정확히 모르겠음"],
      answer : ["at"],
    },
    {
      id: 7,
      question: "___________ Jack speak German?",
      options: ["Do", "Does", "He", "정확히 모르겠음"],
      answer : ["Does"],
    },
    {
      id: 8,
      question: "Are___________ your glasses?",
      options: ["this", "those", "that", "정확히 모르겠음"],
      answer : ["those"],
    },
    {
      id: 9,
      question: "A: Where are your books?  B: They're ___________ the table.",
      options: ["at", "on", "in", "정확히 모르겠음"],
      answer : ["on"],
    },
    {
      id: 10,
      question: "Do you want to ___________ TV at home?",
      options: ["see", "look", "watch", "정확히 모르겠음"],
      answer : ["watch"],
    },
    // {
    //   id: 11,
    //   question: "I'd like to buy ___________ oranges for my mother. [1점]",
    //   options: ["some", "any", "a", "정확히 모르겠음"],
    //   answer : ["some"],
    // },
    // {
    //   id: 12,
    //   question: "___________ ever seen a rainbow in your life? [1점]",
    //   options: ["Did you", "Are you", "Have you", "정확히 모르겠음"],
    //   answer : ["Have you"],
    // },
    // {
    //   id: 13,
    //   question: "If you ___________ a book from a friend, you should return it as soon as possible. [1점]",
    //   options: ["borrow", "earn", "spend", "lend", "정확히 모르겠음"],
    //   answer : ["borrow"],
    // },
    // {
    //   id: 14,
    //   question: "Taking care of a pet is as difficult ___________ taking care of a baby. [1점]",
    //   options: ["like", "so", "than","as", "정확히 모르겠음"],
    //   answer : ["as"],
    // },
    // {
    //   id: 15,
    //   question: "___________ many people in the park. [1점]",
    //   options: ["went out", "had gone out", "has gone out","has been out", "정확히 모르겠음"],
    //   answer : ["went out"],
    // },
    // {
    //   id: 16,
    //   question: "When I was a child, I ___________ play basketball with my dad in our backyard. [1점]",
    //   options: ["will", "used to", "have","does", "정확히 모르겠음"],
    //   answer : ["used to"],
    // },
    // {
    //   id: 17,
    //   question: "Have you finished ___________ the laundry yet? [1점]",
    //   options: ["to do", "does", "doing","being", "정확히 모르겠음"],
    //   answer : ["doing"],
    // },
    // {
    //   id: 18,
    //   question: "This is terrible. I've looked ___________, but I can't find my purse. [1점]",
    //   options: ["nowhere", "anywhere", "everywhere","somewhere", "정확히 모르겠음"],
    //   answer : ["everywhere"],
    // },
    // {
    //   id: 19,
    //   question: "I ___________ in front of a bank when a man in a fancy suit got out of a black car. [1점]",
    //   options: ["stood", "was standing", "have stood","am standing", "정확히 모르겠음"],
    //   answer : ["was standing"],
    // },
    // {
    //   id: 20,
    //   question: "I've ___________ finished painting the door. It looks awesome! [1점]",
    //   options: ["still", "yet", "just","only", "정확히 모르겠음"],
    //   answer : ["just"],
    // },
    // 다른 문제들도 추가 가능
  ];
  const [userInfo, setUserInfo] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const navigate = useNavigate();

  //사용자 정보 호출
  useEffect(() => {
    const fetchUserInfo = async () => {
      const [url, method] = api('getUserInfo');
      try {
        const response = await apiRequest({ url, method });
        setUserInfo(response.data);
      } catch (error) {
        console.error('사용자 정보를 불러오는 데 실패했습니다.', error);
      }
    };

    fetchUserInfo();
    // 문제를 랜덤으로 섞고 10개만 선택
    const shuffledQuestions = [...questions].sort(() => 0.5 - Math.random()).slice(0, 10);
    setSelectedQuestions(shuffledQuestions);
    setSelectedOptions(Array.from({ length: 10 }, () => null));
  }, []);

  const handleOptionChange = (option, questionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const calculateProgress = () => {
    const answeredCount = selectedOptions.filter(option => option !== null).length;
    return (answeredCount / selectedQuestions.length) * 100;
  };

  const progress = calculateProgress();



const handleSubmit = async () => {
    const correctCount = selectedQuestions.reduce((acc, question, index) => {
      navigate('/StudyPage');
      return acc + (selectedOptions[index] === question.answer[0] ? 1 : 0);
    }, 0);

    // 정답 수를 사용자 레벨로 설정
    const [url, method] = api('updateUserInfo', {method:'put'});
    try {
      await apiRequest({
        url,
        method,
        data: { level: correctCount },
      });
      alert('레벨이 업데이트 되었습니다!');
    } catch (error) {
      console.error('레벨 업데이트에 실패했습니다.', error);
    }
  };

  const progressBarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: `${progress}%`,
    backgroundColor: '#ff7f5096',
    height: '20px',
    transition: 'width 0.5s ease-in-out',
    zIndex: 3 // zIndex 추가
  };

  const backgroundStyle = {
    backgroundColor: '#FFF',
    color: '#111',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    textAlign: 'center',
    zIndex: 3 // zIndex 추가
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={backgroundStyle}>
        {progress.toFixed(0)}%
      </div>
      <h1 style={{ color: '#FF7F50', fontSize: '32px', zIndex: 2 }}>Level Test</h1>
      {questions.map((q, index) => (
        <div key={q.id} style={{ margin: '50px auto', maxWidth: '600px', zIndex: 2 }}>
          <div>
            <h2 style={{ fontSize: '32px', margin: 0, border: '3px solid #FF7F50', borderRadius: '5px', padding: '10px' }}>{q.question}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', marginTop: '20px', flexDirection: 'column' }}>
              {q.options.map((option, optionIndex) => (
                <label key={optionIndex} style={{ fontSize: '28px', marginRight: '20px', marginBottom: '20px' }}>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOptions[index] === option}
                    onChange={() => handleOptionChange(option, index)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div style={progressBarStyle}></div>
      <button onClick={openModal} style={{ marginTop: '20px', fontSize: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        제출
      </button>
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
            <button onClick={handleSubmit} style={{
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
};

export default TestPage;
