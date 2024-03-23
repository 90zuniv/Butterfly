const api = function (type, options = {}) {
  const apiObject = {
    // 사용자 인증
    signup: ['/user/', 'post'],
    check_email: [`/unique/email/${options.email}`, 'get'],
    login: ['/user/login', 'post'],
    getUserInfo: [`/user`, 'get'],
    sendMessage: ['/api/sendMessage', 'post'], 

    // 유튜브 링크 저장
    createContent : ['/content/', 'post'],

    updateUserInfo: ['/user', 'patch'],

    chattingDetail: [`/mypage/chatting/detail/${options.id}`, 'get'],


    // 스터디
    youtubeId: [`/content/${options.content_id}`, 'get'], 
    youtubeThumbnail: [`/content/${options.content_thumbnail}`, 'get'], 


  }

  return apiObject[type]
}

export default api
