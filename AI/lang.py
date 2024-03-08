# from langchain import chat_models
import openai
import os
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

KEY = os.getenv('yj_api')

os.environ['OPENAI_API_KEY'] = '${KEY}'

# openai.api_key = "api-key"
a= ChatOpenAI(
    temperature=0,               # 창의성 (0.0 ~ 2.0) 
    max_tokens=2048,             # 최대 토큰수
    model_name='gpt-4-0125-preview',

)
print(KEY)