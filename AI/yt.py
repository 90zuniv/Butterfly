# yt-dlp --write-thumbnail --write-subs -P output/yt_dlp/ -o test.%(ext)s https://www.youtube.com/wa
import yt_dlp

def yt():

    url= input()
    ydl_opts= {

        'writethumbnail': True,  # 썸네일 다운로드 여부
        'writesubtitles': True,  # 자막 다운로드 여부
        'outtmpl': 'output/yt_dlp/test.%(ext)s',  # 저장 경로 및 파일명 형식
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
