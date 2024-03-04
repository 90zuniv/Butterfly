import React, {useState, useRef} from 'react';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player';

//form을 통해서 입력값을 받아오는 형태입니다.
function Test() {
  const [url, setUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const videoID = url.split('?v=').length > 1 ? url.split('?v=')[1]: false;
    if (videoID) {
      setVideoUrl(`https://www.youtube.com/watch?v=${videoID}`);
    } else {
      console.log('다시 입력해주세요')
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={handleChange} placeholder="Enter video URL here" />
        <button type="submit">Submit</button>
      </form>
      {videoUrl && <ReactPlayer url={videoUrl} controls={true} />}
    </div>
  );
}

  
//   const formRef = useRef();
//   const inputRef = useRef();

//   const onSearch = (event) => {
//     event.preventDefault();
//     const value = inputRef.current.value;
//     if (value === '') {
//       const videoIdFromURI =
//         value.split('?v=').length > 1 ? value.split('?v=')[0]: false;
//       console.log(videoIdFromURI)
//     }
//   };
//   // https://www.youtube.com/watch?v=FgoMjtMrwfI
    
    
//   return (
//     <div>
//         <form
//           ref={formRef}
//           onSubmit={onSearch}
//         >
//           <input
//             ref={inputRef}
//             type="text"            
//             placeholder={
//               '영상 url 혹은 검색어를 입력해주세요'
//             }            
//           />
//           <button value={'제출'}>

//           </button>
//         </form>
//     </div>

//   )


// }
export default Test;

