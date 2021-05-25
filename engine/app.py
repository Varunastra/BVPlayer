from flask import Flask, request
import librosa
import librosa.display
from tensorflow import keras
import tensorflow as tf
import matplotlib.pyplot as plt
from matplotlib import cm
import numpy as np
import socket
from lightfm.data import Dataset
from lightfm import LightFM
from lightfm.cross_validation import random_train_test_split   
from lightfm.evaluation import auc_score
import pylab
import os
import warnings

warnings.filterwarnings('ignore')
np.set_printoptions(precision=2)

genres = 'blues classical country disco hiphop jazz metal pop reggae rock'.split()

img_width = 120
img_height = 120

app = Flask(__name__)
model = keras.models.load_model('model.h5')

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

@app.route('/api/tracks/predict-genre', methods=["POST"])
def predict_genre():
    if 'track' not in request.files:
        return { 'message': 'Track not uploaded' }, 400
    track = request.files['track']
    songname = track.filename
    track.save(songname)
    y, sr = librosa.load(songname, mono=True, duration=25)
    M = librosa.feature.melspectrogram(y=y, sr=sr, n_fft=2048, hop_length=512, n_mels=96, power=2)
    log_power = librosa.power_to_db(M, ref=np.max)
    pylab.figure(figsize=(5,5), dpi=72)
    pylab.axis('off')
    pylab.axes([0., 0., 1., 1.], frameon=False, xticks=[], yticks=[])
    librosa.display.specshow(log_power, cmap=cm.jet)
    pylab.savefig(f'spectrogram.jpg', bbox_inches=None, pad_inches=0)
    pylab.close()
    image = tf.keras.preprocessing.image.load_img(f'spectrogram.jpg', target_size=(img_width, img_height))
    input_arr = keras.preprocessing.image.img_to_array(image)
    result = model.predict(np.array([input_arr]))[0]
    predictions = [genres[x] for x in np.argsort(-result)]
    os.remove(songname)
    return { "genres": predictions }

@app.route('/api/tracks/recommendations', methods=["POST"])
def tracks_recommendations():
    json = request.get_json()
    tracks = json['tracks']
    likes = json['likes']
    users = json['users']
    user = json['user']
    dataset = Dataset()
    dataset.fit((x['UserId'] for x in likes),
                (x['TrackId'] for x in likes))
    dataset.fit_partial(items=(x['id'] for x in tracks),
                        item_features=(x['artist'] for x in tracks))
    dataset.fit_partial(items=(x['id'] for x in tracks),
                        item_features=(x['genres'].split(',')[0] for x in tracks))
    dataset.fit_partial(users=(x['id'] for x in users),
                        user_features=(x['age'] for x in users))
    dataset.fit_partial(users=(x['id'] for x in users),
                        user_features=(x['sex'] for x in users))
    (interactions, weights) = dataset.build_interactions((x['UserId'], x['TrackId'], x['rating'])
                                                      for x in likes)
    item_features = dataset.build_item_features((x['id'], [x['artist']] + x['genres'].split(','))
                                                for x in tracks)
    user_features = dataset.build_user_features((x['id'], [x['age'], x['sex']])
                                                for x in users)
    user_id_map, user_feature_map, items_id_mapping, item_feature_map = dataset.mapping()
    items_id_mapping = {value: key for key, value in items_id_mapping.items()}
    model = LightFM(loss='warp')
    model.fit(interactions, item_features=item_features)
    n_users, n_items = interactions.shape
    scores = model.predict(user_id_map[user['id']], np.arange(n_items), item_features=item_features)
    scores.sort()
    mapped_scores = [int(items_id_mapping[x]) for x in np.argsort(-scores)]
    return { "recommendations": mapped_scores }

@app.route('/')
def home():
    return get_ip()