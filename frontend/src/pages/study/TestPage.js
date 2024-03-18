import React, { useState } from 'react';

const TestPage = () => {
  // 가상으로 가져온 문제 및 선택지
  const questions = [
    {
      id: 1,
      question: "1. What ___________ your name? [1점]",
      options: ["is", "am", "are", "정확히 모르겠음"]
    },
    {
      id: 2,
      question: "2. He has ___________ house in Paris . [1점]",
      options: ["any", "a", "an", "정확히 모르겠음"]
    },
    {
      id: 3,
      question: "3. I work in a ___________. I’m a nurse. [1점]",
      options: ["hospital", "hotel", "supermarket", "정확히 모르겠음"]
    },
    {
      id: 4,
      question: "4. This is my brother. ___________ name is Paul .[1점]",
      options: ["His", "Her", "He's", "정확히 모르겠음"]
    },
    {
      id: 5,
      question: "5. ___________ many people in the park. [1점]",
      options: ["They are", "There is", "There are", "정확히 모르겠음"]
    },
    {
      id: 6,
      question: "6. I go to school  ___________ 7 o’clock in the morning.[1점]",
      options: ["for", "at", "in", "정확히 모르겠음"]
    },
    {
      id: 7,
      question: "7. ___________ Jack speak German? [1점]",
      options: ["Do", "Does", "He", "정확히 모르겠음"]
    },
    {
      id: 8,
      question: "8. Are___________ your glasses?",
      options: ["this", "those", "that", "정확히 모르겠음"]
    },
    {
      id: 9,
      question: "9. A: Where are your books?  B: They're ___________ the table. [1점]",
      options: ["at", "on", "in", "정확히 모르겠음"]
    },
    {
      id: 10,
      question: "10. Do you want to ___________ TV at home? [1점]",
      options: ["see", "look", "watch", "정확히 모르겠음"]
    },
    // 다른 문제들도 추가 가능
  ];

  const [selectedOptions, setSelectedOptions] = useState(Array.from({ length: questions.length }, () => null));

  const handleOptionChange = (option, questionIndex) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  const calculateProgress = () => {
    const answeredCount = selectedOptions.filter(option => option !== null).length;
    const totalQuestions = questions.length;
    return (answeredCount / totalQuestions) * 100;
  };

  const progress = calculateProgress();

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
    </div>
  );
};

export default TestPage;
