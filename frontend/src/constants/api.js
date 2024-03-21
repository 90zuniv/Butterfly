const api = function (type, options = {}) {
  const apiObject = {
    // 사용자 인증
    signup: ['/user/', 'post'],
    check_email: [`/unique/email/${options.email}`, 'get'],
    login: ['/user/login', 'post'],
    getUserInfo: [`/user`, 'get'],

    // 마이페이지 채팅
    updateUserInfo: ['/user', 'patch'],
    updatePassword: ['/user/password', 'patch'],
    chattingDetail: [`/mypage/chatting/detail/${options.id}`, 'get'],
    solvedProblem: [`/mypage/problem/${options.id}`, 'get'],

    // 스터디
    youtubeId: [`/content/${options.content_id}`, 'get'], 
    youtubeThumbnail: [`/content/${options.content_thumbnail}`, 'get'], 

    // codeReview: [`/api/mypage/problem/solve/${options.id}`, 'get'],
    // submitReview: [`/api/mypage/problem/solve/${options.problemId}`, 'get'], // post로 하면 405error
    // submitProblem: ['/api/mypage/problem', 'post'],
  }

  return apiObject[type]
}

export default api
