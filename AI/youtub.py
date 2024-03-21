from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import JSONFormatter

def youtube(youtube_url):
    print("youtube api start")
    trans_list=[]

    # 유튜브 해당 영상에서 공유 버튼 링크 기준
    youtube_id= youtube_url.split('?')[0].split('/')[-1]

    # retrieve the available transcripts
    # 자막 + 타임코드
    # get_transcript= YouTubeTranscriptApi.get_transcript(youtube_id)
    # 리스트
    transcript_list = YouTubeTranscriptApi.list_transcripts(youtube_id)

    # iterate over all available transcripts
    for transcript in transcript_list:
        trans_list.append(transcript.language_code)


    # 영어 자막 있을 경우
    if 'en' in trans_list:
        en_script = transcript_list.find_transcript(['en'])
        script= en_script.fetch()

    # 영어 자막 없을 경우
    else:
        en_script= transcript_list.find_transcript([trans_list[0]]).translate('en')
        script= en_script.fetch()
    
    # print(script)
    script_text= ''
    for i in range(len(script)):
        script_text += script[i]['text']
        script_text += ' '

    file = open("transcript.txt", "w") 
    file.write(script_text)
    file.close()

    print('youtube api success')
    return script_text
    

    

# youtube('https://youtu.be/F8f_Tobdu6o?si=Vhs8M12n67wl_Pgw')