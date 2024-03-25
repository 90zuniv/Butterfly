import os
import cv2
import numpy as np

def compare_images(image1_path, image2_path):
    # 이미지 불러오기
    image1 = cv2.imread(image1_path)
    image2 = cv2.imread(image2_path)

    # 이미지 크기 조정
    image1 = cv2.resize(image1, (300, 300))
    image2 = cv2.resize(image2, (300, 300))

    # 이미지를 그레이스케일로 변환
    image1_gray = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
    image2_gray = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)

    # 히스토그램 계산
    hist1 = cv2.calcHist([image1_gray], [0], None, [256], [0, 256])
    hist2 = cv2.calcHist([image2_gray], [0], None, [256], [0, 256])

    # 히스토그램 비교
    similarity = cv2.compareHist(hist1, hist2, cv2.HISTCMP_CORREL)

    return similarity

images_path= 'C:/Users/201-24/Desktop/frame/'
captures= [cap for cap in os.listdir(images_path) if cap.endswith('jpg')]

for i in captures:
    for j in captures:
        # os.getcwd()
        image1_path = os.path.join(images_path,i)
        image2_path = os.path.join(images_path,j)

        similarity_score = compare_images(image1_path, image2_path)
        if similarity_score> 0.95:
            print(f"{i}와 {j}")
            print(f"두 이미지의 유사도: {similarity_score}")
