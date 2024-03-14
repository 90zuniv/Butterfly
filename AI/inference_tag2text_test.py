'''
 * The Tag2Text Model
 * Written by Xinyu Huang
'''
import argparse
import numpy as np
import random

import torch

from PIL import Image
from ram.models import tag2text
from ram import inference_tag2text as inference

from ram import get_transform
import os

def tagtotext(path):
    print('t2t start')

    # 현재파일 절대경로
    current_path= os.getcwd()
    img_path= os.path.join(current_path, path)

    model_path= 'C:/Users/201-24/nyj/Butterfly/AI/tag2text_swin_14m.pth'
    image_size= 384

    # scenes = [file for file in os.listdir(img_path) if file.endswith('.jpg')]
    scenes = [os.path.abspath(os.path.join(img_path, file)) for file in os.listdir(img_path) if file.endswith('01.jpg')]
    # print('scenes_list',scenes)
    caption=[]

    # delete some tags that may disturb captioning
    # 127: "quarter"; 2961: "back", 3351: "two"; 3265: "three"; 3338: "four"; 3355: "five"; 3359: "one"
    delete_tag_index = [127, 2961, 3351, 3265, 3338, 3355, 3359]

    # 각 사진 당 묘사
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = tag2text(pretrained=model_path,
                     image_size=image_size,
                     vit='swin_b',
                     delete_tag_index=delete_tag_index)
    model.threshold =0.68  # threshold for tagging
    model.eval()
    model = model.to(device)
    transform = get_transform(image_size=image_size)

    print('load success')

    for cap in scenes:
        print(cap)

        #######load model

        image = transform(Image.open(cap)).unsqueeze(0).to(device)

        res = inference(image, model, '')
        print("Model Identified Tags: ", res[0])
        print("User Specified Tags: ", res[1])
        print("Image Caption: ", res[2])
        caption.append(res[2])
        print('turn')

    # print('caption',caption)

    file_name = './caption.txt'

    with open(file_name, 'w+') as file:
        for num, i in enumerate(caption):
            if num+1 < len(caption):
                file.write(', '.join(i) + "\n")
            else:
                file.write(', '.join(i))



tagtotext('./output/frame/')
# print(os.getcwd())