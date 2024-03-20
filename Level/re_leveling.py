import json

with open ('../AI/chatting.json','r') as file:
    chatting= json.load(file)

def js():
    user_content=[]

    # print('out',chatting)
    for turn in chatting:
        # pass
        # print('turn',turn)
        if turn['role']=='user':
            user_content.append(turn['content'])
        #     print(turn['content'])

    # 마지막 종료명령어 제외한 나머지 content
    print(user_content[:-1])
    user_content= user_content[:-1]
    with open('user_content.txt','w') as file:
        for i in user_content:
            file.write(i + '\n')
            