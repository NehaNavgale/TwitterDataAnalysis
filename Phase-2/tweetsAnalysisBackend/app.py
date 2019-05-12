from flask import Flask
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
CORS(app)


def load_countryData():
  csv_data = pd.read_csv("static/Input/byCountry.csv", sep=',')
  return csv_data

def load_movieData():
  csv_data = pd.read_csv("static/Input/byMovie.csv", sep=',')
  return csv_data

def load_characterData():
  csv_data = pd.read_csv("static/Input/byCharacter.csv", sep=',')
  return csv_data

def load_deviceData():
  csv_data = pd.read_csv("static/Input/byDevice.csv", sep=',')
  return csv_data

def load_langData():
  csv_data = pd.read_csv("static/Input/byLanguage.csv", sep=',')
  return csv_data

def load_yearData():
  csv_data = pd.read_csv("static/Input/byYear.csv", sep=',')
  return csv_data

def load_hashtag():
  csv_data = pd.read_csv("static/Input/hashtag.csv", sep=',')
  return csv_data

def load_sentiment():
  csv_data = pd.read_csv("static/Input/sentiment.csv", sep=',')
  return csv_data


def load_MovieLocation():
  csv_data = pd.read_csv("static/Input/byEndGameAndLocation.csv", sep=',')
  return csv_data

def load_BeforeAfter():
  csv_data = pd.read_csv("static/Input/beforeAndAfterRelease.csv", sep=',')
  return csv_data

@app.route('/api/byCountry')
def byCountry():
    data = load_countryData()
    return data.to_json(orient='records')


@app.route('/api/byMovie')
def byMovie():
    data = load_movieData()
    return data.to_json(orient='records')

@app.route('/api/byCharacter')
def byCharacter():
    data = load_characterData()
    return data.to_json(orient='records')

@app.route('/api/byDevice')
def byDevice():
    data = load_deviceData()
    return data.to_json(orient='records')

@app.route('/api/byLang')
def byLang():
    data = load_langData()
    return data.to_json(orient='records')

@app.route('/api/byYear')
def byYear():
    data = load_yearData()
    return data.to_json(orient='records')

@app.route('/api/byHashtag')
def byHashtag():
    data = load_hashtag()
    return data.to_json(orient='records')

@app.route('/api/bySentiment')
def bySentiment():
    data = load_sentiment()
    return data.to_json(orient='records')

@app.route('/api/byEndGameLocation')
def byEndGameLocation():
    data = load_MovieLocation()
    return data.to_json(orient='records')

@app.route('/api/beforeAndAfterRelease')
def beforeAndAfterRelease():
    data = load_BeforeAfter()
    return data.to_json(orient='records')

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
