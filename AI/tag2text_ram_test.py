'''
 * The Tag2Text Model
 * Written by Xinyu Huang
'''
import time
import os
import torch
from PIL import Image
from ram.models import tag2text
from ram.models import ram_plus
from ram import get_transform
from ram import inference_tag2text as t2tinference
from ram import inference_ram as raminference
from inference_ram_plus import ramplus


def tagtotext(img_path, model_path):
    print('tag2text start')
    start= time.time()

    # 현재파일 절대경로
    current_path= os.getcwd()
    img_path= os.path.join(current_path, img_path)

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



########### ram 
    # ramdevice = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    rammodel = ram_plus(pretrained= 'ram_plus_swin_large_14m.pth',
                             image_size=image_size,
                             vit='swin_l')
    
    rammodel.eval()
    rammodel = rammodel.to(device)
    # transform = get_transform(image_size=image_size)
    

    # print('tag_model load success')

    # 각 사진 당 묘사
    for cap in scenes:
        print(cap)
        #######load model

        image = transform(Image.open(os.path.join(img_path, cap))).unsqueeze(0).to(device)
        # image = transform(Image.open(cap)).unsqueeze(0).to(device)

        # specified_tags= "cat,dog"
        # specified_tags= ramplus(os.path.join(img_path, cap),
        #                         'ram_plus_swin_large_14m.pth').replace(' |',',')

        ramres = raminference(image, rammodel)
        print("Image Tags: ", ramres[0])
        specified_tags= ramres[0].replace(' |',',')



        t2tres = t2tinference(image, model, specified_tags)
        # generate 메서드에 custom_tag_input을 넘깁니다.
        # 함수가 예측한 태그도 반환하길 원한다면 return_tag_predict=True로 지정하세요.
        # res = model.generate(image, tag_input=custom_tags, return_tag_predict=True)
        print("Model Identified Tags: ", t2tres[0])
        print("User Specified Tags: ", t2tres[1])
        print("Image Caption: ", t2tres[2])
        caption+= t2tres[2]
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