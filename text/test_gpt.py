import openai

from youtube_transcript_api import youtube


youtube('F8f_Tobdu6o')

scene_file= "Butterfly/text/caption_.txt"
voice_manual_file= "Butterfly/text/text_manual.txt"
voice_auto_file= "Butterfly/text/text_auto.txt"

# scene detection
with open(scene_file, 'r') as text:
    scene_text= text.readlines()
    # 각 문장 끝에 점을 추가한다
    scene_text = [sentence.strip() + '. ' for sentence in scene_text]
    # 수정된 문장들을 합쳐서 하나의 문자열로 만든다
    scene_text = ''.join(scene_text)

# description detection
with open(voice_manual_file, 'r') as text:
    voice_manual_text= text.readlines()
with open(voice_auto_file, 'r') as text:
    voice_auto_text= text.readlines()


# GPT
openai.api_key = "api key"

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": f"""
         너는 어떠한 컨텐츠의 내용을 이해해서 그 내용이나 줄거리에 대한 대화를 유도하는 선생님이야.
         <첫번째 글> : {scene_text}
         <두번째 글> : {voice_manual_text}
         <세번째 글> : {voice_auto_text}
         
         1. 위 세 가지 글은 모두 하나의 컨텐츠에 대한 내용이야.
         2. 세 가지 글을 조합하여 어떤 줄거리 및 내용을 가진 컨텐츠인지 파악해.
         3. 컨텐츠 내용에 대한 대화를 친구와 수다떨듯이 이어가면 돼.
         4. 파악한 내용에 대해서는 언급하지 마.
         5. 모든 말은 질문으로 끝나게 하여 대답을 유도하도록 해.
         """},
        {"role": "user", "content": ""},
        {"role": "assistant", "content": "영상 어땠어?"},
        {"role": "user", "content": "굉장히 흥미로웠어!"}
    ]
)

# print(response['choices'][0]['message']['content'])
print(response.choices[0].message.content)
