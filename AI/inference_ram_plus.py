'''
 * The Recognize Anything Plus Model (RAM++)
 * Written by Xinyu Huang
'''
import argparse
import numpy as np
import random

import os
import torch

from PIL import Image
from ram.models import ram_plus
from ram import inference_ram as inference
from ram import get_transform


def ramplus(img_path, model_path):
    print('ram plus start')

    # 현재파일 절대경로
    current_path= os.getcwd()
    img_path= os.path.join(current_path, img_path)

    # default : 448
    image_size= 384

    # scenes = [file for file in os.listdir(img_path) if file.endswith('.jpg')]

    ramdevice = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    rammodel = ram_plus(pretrained= model_path,
                             image_size=image_size,
                             vit='swin_l')
    
    rammodel.eval()
    rammodel = rammodel.to(ramdevice)
    transform = get_transform(image_size=image_size)

    # for cap in scenes:
    print(img_path)
    image = transform(Image.open(img_path)).unsqueeze(0).to(device)
    res = inference(image, model)

    print("Image Tags: ", res[0])
    print("图像标签: ", res[1])

    return res[0]



# model= 'ram_plus_swin_large_14m.pth'
# img= 'output/frame/'
# ramplus(img,model)