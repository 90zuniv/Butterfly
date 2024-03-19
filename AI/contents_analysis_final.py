import openai
import os

from yt import yt
from scene_3 import sc
from youtub import youtube
from inference_tag2text_test import tagtotext

def contents_anal():
    youtube_url= input()

    yt_path= './output/yt_dlp/'
    fr_path= './output/frame/'
    t2t_path= 'C:/Users/201-24/nyj/Butterfly/AI/tag2text_swin_14m.pth'

    # yt-dlp (영상 및 썸네일 저장 - 이름지정(test.mp4))
    yt(youtube_url, yt_path)

    # scenedetect (frame별 타임코드csv와 이미지저장)
    sc(yt_path, fr_path)

    # tag2text
    # 문자열
    caption_txt= tagtotext(fr_path, t2t_path)

    # youtube 자막 텍스트 파일로 저장
    # 문자열
    script_txt= youtube(youtube_url)

    # scene detection
    with open(caption_txt, 'r') as text:
        scene_text= text.readlines()

    # description detection
    with open(script_txt, 'r') as text:
        script_text= text.readlines()
    
    
    return scene_text, script_text