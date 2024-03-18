import openai
import os

from yt import yt
from scene_3 import sc
from youtub import youtube
import inference_tag2text_test

youtube_url= input()

yt_path= './output/yt_dlp/'
fr_path= './output/frame/'

# yt-dlp (영상 및 썸네일 저장 - 이름지정)
print('yt-dlp start')
yt()
print('yt_dlp success')

# scenedetect (frame별 타임코드csv와 이미지저장)
print('scenedetect start')
sc()
print('scenedetect success')

# tag2text
print('tag2text start')
inference_tag2text_test.tagtotext(fr_path)
print('tag2text success')

# youtube 자막 텍스트 파일로 저장
youtube(youtube_url)

# 위 영상 분석을 통한 결과물
scene_file= "caption_.txt"
voice_manual_file= "text_manual.txt"
voice_auto_file= "text_auto.txt"

# scene detection
with open(scene_file, 'r') as text:
    scene_text= text.readlines()
    # 각 문장 끝에 점을 추가한다
    scene_text = [sentence.strip() + '. ' for sentence in scene_text]
    # 수정된 문장들을 합쳐서 하나의 문자열로 만든다
    scene_text = ''.join(scene_text)

# description detection
with open(voice_manual_file, 'r') as text:
    voice_manual_text= text.readlines()
with open(voice_auto_file, 'r') as text:
    voice_auto_text= text.readlines()