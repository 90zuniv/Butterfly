from scenedetect import open_video,SceneManager
from scenedetect.detectors import ContentDetector
from scenedetect.scene_manager import SceneManager, save_images
from scenedetect import detect, AdaptiveDetector, split_video_ffmpeg

video_path= 'C:/Users/201-24/nyj/pyscenedetect/subway.mp4'
video= open_video(video_path)

# 디텍터 생성, 임계값 30, 장면당 최소 프레임 수 150
content_detector= ContentDetector(threshold=30.0, min_scene_len= 100)

# SceneManager 생성
scene_manager= SceneManager()
scene_manager.add_detector(content_detector)

scene_list = detect('subway.mp4', AdaptiveDetector())

# save_images
save_images(scene_list,"C:/Users/201-24/nyj/pyscenedetect/subway.mp4")

print('finish')