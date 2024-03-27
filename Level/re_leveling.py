import json
from cefr_predictor.inference import Model

# # 테스트용
with open ('../AI/chatting.json','r') as file:
    chatting= json.load(file)
print('chatting',chatting)

def js(json_str):
    
    model = Model("cefr_predictor/models/xgboost.joblib")

    # 사용자 contents
    user_content=''

    for turn in json_str:
        if turn['role']=='user':
            user_content+=turn['content']
            user_content+= '\n'

    # # 마지막 사용자 종료명령어(ex. End) 제외한 나머지 content
    # user_content= user_content[:-1]
    user_content= [user_content]
    levels, scores = model.predict_decode(user_content)
    
    print('levels', levels)
    for i in scores[0]:
        print(i," : " ,scores[0][i])
    # print('scores',scores)





print('-------------load-------------\n')
js(chatting)
            