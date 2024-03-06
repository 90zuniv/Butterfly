from scenedetect import open_video,SceneManager
from scenedetect.detectors import ContentDetector

video_path= 'C:/Users/201-24/nyj/pyscenedetect/PySceneDetect/data/subway.mp4'
video= open_video(video_path)

# 디텍터 생성, 임계값 30, 장면당 최소 프레임 수 150
content_detector= ContentDetector(threshold=30.0, min_scene_len= 100)

# SceneManager 생성
scene_manager= SceneManager()
scene_manager.add_detector(content_detector)

# SceneDetect 수행
scene_manager.detect_scenes(video, show_progress=True)

# 결과 : 총 9729개의 프레임을 검사하여 41개의 장면 탐지

# 장면 분할 결과 출력
scene_list= scene_manager.get_scene_list()
print()

for scene in scene_list:
    start, end= scene
    print(start, "~", end)