import gradio as gr

# 예시: 프로젝트 내의 AI 모델 호출 함수 (여기서는 your_ai_function()이 실제 모델 호출 함수라고 가정)
def chat_with_ai(user_message, history):
    # history는 [(사용자 메시지, AI 응답), ...] 형태의 대화 기록입니다.
    # 예시로, 백엔드 로직이나 AI 모델을 호출하는 부분을 구현합니다.
    ai_response = your_ai_function(user_message)  # 이 부분을 실제 코드로 대체
    history.append((user_message, ai_response))
    return history, history  # chatbot 컴포넌트와 내부 상태 모두에 반환

# Gradio 인터페이스 구성: Chatbot 인터페이스를 사용
iface = gr.Interface(
    fn=chat_with_ai,
    inputs=[gr.components.Textbox(label="메시지 입력"), gr.components.State()],
    outputs=[gr.components.Chatbot(label="챗봇 대화"), gr.components.State()],
    title="프로젝트 챗봇 인터페이스",
    description="AI 모델과 백엔드가 연동된 챗봇 인터페이스 예시입니다."
)

iface.launch()


import requests

def chat_with_ai(user_message, history):
    # 백엔드 API 호출 예시
    response = requests.post("http://localhost:5000/api/chat", json={"message": user_message})
    ai_response = response.json().get("response", "응답 없음")
    history.append((user_message, ai_response))
    return history, history


