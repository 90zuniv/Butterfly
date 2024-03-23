import os
import time
import shutil

from ytdlp import yt
from scene_detect import sc
from youtub import youtube
from inference_tag2text_test import tagtotext
#------------------------------------------------------------------------------------
import pymysql
import dotenv
dotenv.load_dotenv()

USER_NAME = os.getenv('USER_NAME')
PASSWORD = os.getenv('PASSWORD')
HOST = os.getenv('HOST')
PORT = os.getenv('PORT')
DB_NAME = os.getenv('DB_NAME')



conn = pymysql.connect(host=HOST, user=USER_NAME, password=PASSWORD,
                        db=DB_NAME, charset='utf8')
cur= conn.cursor()
cur.execute("SELECT content_id FROM content ORDER BY id DESC LIMIT 1")

row = cur.fetchall()

# ------------------------------------------------------------------------------------
# cur.execute("CREATE TABLE contents (chat_id int, thumbnail varchar(50), content_id varchar(50)")


def contents_anal():
    youtube_url= row[0][0]
    start= time.time()

    yt_path= './output/yt_dlp/'
    fr_path= './output/frame/'
    t2t_path= 'tag2text_swin_14m_1.pth'

    # 기존 파일 및 폴더 지우기
    if os.path.exists(yt_path):
        shutil.rmtree(yt_path)
    if os.path.exists(fr_path):
        shutil.rmtree(fr_path)

    # yt-dlp (영상 및 썸네일 저장 - 이름지정(test.mp4))
    yt(youtube_url, yt_path)

    # scenedetect (frame별 타임코드csv와 이미지저장)
    sc(yt_path, fr_path)

    # tag2text
    # 문자열
    caption_txt= tagtotext(fr_path, t2t_path)
    # with open('caption.txt', 'r') as file:
    #     caption_txt= file.readlines()


    # youtube 자막 텍스트 파일로 저장
    # 문자열
    script_txt= youtube(youtube_url)


    ####### 실행 x ########
    # # scene detection
    # with open(caption_txt, 'r') as text:
    #     scene_text= text.readlines()

    # # description detection
    # with open(script_txt, 'r') as text:
    #     script_text= text.readlines()
    #######################
    
    finish= time.time()
    duration= finish-start
    print('Duration of Time is ',duration)
    
    return caption_txt, script_txt

a,b= contents_anal()
print('scene',a)
print('script',b)