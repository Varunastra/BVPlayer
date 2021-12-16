FROM python:3.9-slim-buster
WORKDIR /engine
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
COPY requirements.txt requirements.txt
RUN apt-get update && \
    apt-get -y install gcc mono-mcs && \
    apt-get -y install ffmpeg && \
    apt-get -y install libsndfile1 && \
    rm -rf /var/lib/apt/lists/*
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]