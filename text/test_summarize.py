scene_file= "summ/caption_.txt"
voice_file= "././Butterfly/text/text_manual.txt"

with open(scene_file, 'r') as text:
    scene_text= text.readlines()
    # 각 문장 끝에 점을 추가한다
    scene_text = [sentence.strip() + '. ' for sentence in scene_text]
    # 수정된 문장들을 합쳐서 하나의 문자열로 만든다
    scene_text = ''.join(scene_text)

with open(voice_file, 'r') as text:
    voice_text= text.readlines()

print('scene_text::::', scene_text)
print('voice_text::::', voice_text)

# scene_text= ""
# voice_text= ""
from gensim.summarization.summarizer import summarize, summarize_corpus

# scene 요약
summarized_video = summarize(scene_text, word_count= 100)#, ratio= 0.3)
print('summarize: ', summarized_video)

# voice 요약
summarized_video = summarize(voice_text[0], word_count= 100)#, ratio= 0.3)
print('summarize: ', summarized_video)
