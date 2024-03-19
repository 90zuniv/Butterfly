const api = function (type, options = {}) {
  const apiObject = {
    // 사용자 인증
    signup: ['/api/user', 'post'],
    check_id: [`/api/unique/id/${options.name}`, 'get'],
    check_email: [`/api/unique/email/${options.email}`, 'get'],
    login: ['/api/user/login', 'post'],
    // logout: ['/api/member/refreshToken', 'delete'],
    // refreshToken: ['/api/member/refreshToken', 'get'],
    getUserInfo: [`/api/user`, 'get'],

    // 마이페이지 채팅
    updateUserInfo: ['/api/user', 'patch'],
    updatePassword: ['/api/user/password', 'patch'],
    // cahttingHistory: [
    //   `/api/mypage/chatting/${options.id}/${options.year}/${options.month}`,
    //   'get',
    // ],
    chattingDetail: [`/api/mypage/chatting/detail/${options.id}`, 'get'],
    solvedProblem: [`/api/mypage/problem/${options.id}`, 'get'],

    // 스터디
    youtubeId: [`/api/content/${options.content_id}`, 'get'], 
    youtubeThumbnail: [`/api/content/${options.content_thumbnail}`, 'get'], 
    // study: ['api/studyroom/study', 'post'], 

    // codeReview: [`/api/mypage/problem/solve/${options.id}`, 'get'],
    // submitReview: [`/api/mypage/problem/solve/${options.problemId}`, 'get'], // post로 하면 405error
    // submitProblem: ['/api/mypage/problem', 'post'],
  }

  return apiObject[type]
}

export default api
