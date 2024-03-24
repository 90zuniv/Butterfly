'''
 * The Tag2Text Model
 * Written by Xinyu Huang
'''
import time
import os
import torch
from PIL import Image
from ram.models import tag2text
from ram import get_transform
from ram import inference_tag2text as inference


def tagtotext(img_path, model_path):
    print('tag2text start')
    start= time.time()

    # 현재파일 절대경로
    current_path= os.getcwd()
    img_path= os.path.join(current_path, img_path)

    # model_path= 'C:/Users/201-24/nyj/Butterfly/AI/tag2text_swin_14m.pth'
    image_size= 384

    scenes = [file for file in os.listdir(img_path) if file.endswith('.jpg')]
    # scenes = [os.path.abspath(os.path.join(img_path, file)) for file in os.listdir(img_path) if file.endswith('01.jpg')]

    # 사진 묘사 텍스트
    caption=''

    # delete some tags that may disturb captioning
    # 127: "quarter"; 2961: "back", 3351: "two"; 3265: "three"; 3338: "four"; 3355: "five"; 3359: "one"
    delete_tag_index = [127, 2961, 3351, 3265, 3338, 3355, 3359]

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = tag2text(pretrained=model_path,
                     image_size=image_size,
                     vit='swin_b',
                     delete_tag_index=delete_tag_index,
                     )
    
    # model.load_state_dict(torch.load(model_path, map_location=device))
    model.threshold =0.68  # threshold for tagging
    model.eval()
    model = model.to(device)
    transform = get_transform(image_size=image_size)
    

    # print('tag_model load success')

    # 각 사진 당 묘사
    for cap in scenes:
        print(cap)
        #######load model

        # custom_tags = "cat"

        image = transform(Image.open(os.path.join(img_path, cap))).unsqueeze(0).to(device)
        # image = transform(Image.open(cap)).unsqueeze(0).to(device)

        specified_tags= ""

        res = inference(image, model, specified_tags)
        
        print("Model Identified Tags: ", res[0])
        print("User Specified Tags: ", res[1])
        print("Image Caption: ", res[2])
        caption+= res[2]
        caption+= '.\n'

    with open('caption.txt', 'w+') as file:
        file.write(caption)
    
    print('tag2text success')
    finish= time.time()
    total= finish-start
    print('총 소요시간 : ', total)
    return caption



tagtotext('output/frame/', 'tag2text_swin_14m_1.pth')

# print(os.getcwd())