# scenedetect -i output/yt_dlp/*.mp4 -o output/frame/ list-scenes save-images 
# scene 단위 이미지 저장

import os
from scenedetect import scene_manager as s
from scenedetect.scene_manager import SceneManager
# from scenedetect.frame_timecode import FrameTimecode
from scenedetect import open_video, ContentDetector

def sc(input_path, output_path):
    print('scenedetect start')

    video = open_video(os.path.join(input_path,'test.mp4'))

    # scenedetect 초기화
    scene_manager = SceneManager()
    # scene_manager.add_detector(scenedetect.detectors.ContentDetector())
    scene_manager.add_detector(ContentDetector(threshold= 10))

    # 장면 감지 프로세스 실행
    scene_manager.detect_scenes(video)

    # 감지된 장면의 이미지 저장
    scene_list = scene_manager.get_scene_list()
    s.save_images(scene_list, video=video, output_dir=output_path)

    print('scenedetect success')
    # print("Scene images saved successfully.")