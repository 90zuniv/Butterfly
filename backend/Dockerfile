FROM python:3.8
WORKDIR /apps/
COPY ./requirements.txt /apps/requirements.txt
# 타임존 설정 (설정을 하지 않으면 시간 저장시 다른 시간대로 저장됨)
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezone
RUN pip3 install --upgrade pip
RUN pip3 install --no-cache-dir --upgrade -r /apps/requirements.txt
COPY ./ /apps/
CMD ["python3", "./app_start.py"]
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"] (편집됨) 