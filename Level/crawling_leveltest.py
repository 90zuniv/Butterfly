import time
import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By

driver= webdriver.Chrome()

driver.get('https://docs.google.com/forms/d/e/1FAIpQLSe16mcLmqsQifFtcxp5mME1vVu1WE1rl8sHfqMdS3qNroL-GQ/viewform?embedded=true')
question= driver.find_elements(By.CLASS_NAME,'Qr7Oae')

with open('test.txt', 'w') as file:
    for i in range(4,60):
        is_correct= question[i]
        print(is_correct.text,'\n\n')
        file.write(is_correct.text + '\n\n')

# print(question[-1].text)




driver.get('https://docs.google.com/forms/d/e/1FAIpQLSe16mcLmqsQifFtcxp5mME1vVu1WE1rl8sHfqMdS3qNroL-GQ/viewscore?viewscore=AE0zAgDJSrNRVTY9LIi1g4atNppwgnF0eRfvmwoAZgypmnPgUg0GyWHuI8vVCwM1cxo1SBg')
# time.sleep(5)


questions= driver.find_elements(By.CLASS_NAME,'Qr7Oae')
# print(questions[4].text)
"""
1. What ___________ your name?
0/1
is
am
 are
정확히 모르겠음
정답
is
"""

# print(questions[44].text)
"""
<Question 41~55> 다음 한국어 문장을 보고 해당 문장을 영어로 말할 수 있다고 생각하면 "예", 없다면 "아니요"에 체크
해 주세요.

"""

# print(questions[59].text)
"""
 55. 나는 일본에서 여러 해 살았기 때문에 도로 좌측에서 운전하는 것에 익숙해져 있었다.
0/2
예
아니오
 정답
예

"""

# 정오답 체크
# with open('answer.txt', 'w') as file:
#     for i in range(4,44):
#         is_correct= questions[i]
#         # print(is_correct.text)
#         # print(i-3,'번 문제')
#         numbering= f"{i-3}번 문제"
#         file.write(numbering)

#         if is_correct.text.split('\n')[1][0] == '0' : # 틀림
#             wrong= is_correct.find_element(By.CLASS_NAME, 'D42QGf').text.split('\n')[1]
#             # print('틀림.. 정답은?',wrong)
#             file.write(wrong + '\n\n')
#         else: # 맞음
#             options= is_correct.find_elements(By.CLASS_NAME, 'yUJIWb')
#             # print('개수',len(options))
#             for j in options:
#                 if '\n' in j.text: # 정답
#                     right= j.text.strip()
#                     # print('맞음! 정답은?',right)
#                     file.write(right + '\n\n')
#         # print('\n\n')


"""
1~40 번 객관식
"""