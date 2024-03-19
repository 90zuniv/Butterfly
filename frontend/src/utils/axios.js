import axios from "axios";
import api from '../constants/api'
const apiRequest = axios.create({
  baseURL: 'http://googongz.com/',
  withCredentials: true,
});

// request 인터셉터
apiRequest.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response 인터셉터
apiRequest.interceptors.response.use(
  (response) => {
    console.log('response', response)
    return response
  },
  async (error) => {
    console.log('error', error)
    const originalConfig = error.config // 기존 요청 정보 저장
    const response = error.response // 에러 정보 추출
    // accesstoken 재발급 로직
    if (response.status === 403 && response.data === 'accessToken expired') {
      console.log('accessToken 재발급 요청 보냄')
      // accessToken 재발급 요청
      const [url, method] = api('refreshToken')
      const config = { url, method }
      await axios
        .request(config)
        .then((res) => {
          console.log('accessToken 재발급 요청 response')
          // accessToken 재발급 성공 시, 새로운 accessToken으로 기존 요청 반복
          return apiRequest(originalConfig)
        })
        .catch((err) => {
          console.log('accessToken 재발급 요청 error')
          // accessToken 재발급 실패 시, 로그인 페이지로 사용자 이동
          console.log('다시 로그인 해주세요')
          window.location.href = 'https://sccs.kr/auth/login'
        })
    }
    if (response.status >= 500) {
      console.log('서버와의 통신에 문제가 발생하였습니다.')
    }
    return Promise.reject(error)
  },
)


export default apiRequest;
