import datetime, pytz
import time
import re
import json
import emoji
from pyspark.sql import SparkSession
from pyspark import SparkContext, SparkConf
from pyspark.sql.functions import to_date
from pyspark.sql.functions import col
from pyspark.sql.functions import from_unixtime
from pyspark.sql.functions import unix_timestamp
from pyspark.sql.functions  import date_format
from pyspark.sql.functions import regexp_replace
from pyspark.sql.functions import regexp_extract
from pyspark.sql.functions import split
from pyspark.sql.functions import udf
from pyspark.sql.types import *
from textblob import TextBlob
spark = SparkSession.builder.appName("Tweets Analysis").getOrCreate()
import pandas as pd

df = spark.read.json("static/Tweets/NewAvengersTweets.json")
df.createOrReplaceTempView("tweets")
df.printSchema()

# Query 1: Sentiment Analysis

# query1 = spark.sql("SELECT text FROM tweets")
# i=0
# positive=0
# neutral=0
# negative=0
#
# for t in query1.select("text").collect():
#     i=i+1
#     analysis = TextBlob(str((t.text).encode('ascii', 'ignore')))
#     if (analysis.sentiment.polarity<0):
#        	negative=negative+1
#     elif(analysis.sentiment.polarity==0.0):
#         neutral=neutral+1
#     elif(analysis.sentiment.polarity>0):
#         positive=positive+1
#
# print(negative)
# print(neutral)
# print(positive)
#
# sentiment = {'Sentiment': ['negative', 'neutral', 'positive'], 'Count': [negative, neutral, positive]}
# sent = pd.DataFrame(data=sentiment)
# sent.to_csv('static/Input/sentiment.csv', index=False)
#
# # Query 2: Number of tweets by location
#
# query2 = spark.sql("select count(*) as count, user.location from tweets where user.location is not null group by "
#                        "user.location order by count desc Limit 20")
# query2.show()
# pd = query2.toPandas()
# pd.to_csv('static/Input/byCountry.csv', index=False)
#
# # Query 3: Number of tweets for each movie
#
# query3 = spark.sql("SELECT COUNT(*) AS NumberOfTweets, 'Avengers Infinity War' as Movie FROM tweets where upper(text) LIKE '%INFINITY%' "
#                        "UNION SELECT COUNT(*) AS NumberOfTweets,'Avengers Age of Ultron' as Movie FROM tweets where upper(text) LIKE '%ULTRON%' "
#                        "UNION SELECT COUNT(*) AS NumberOfTweets, 'Avengers Civil War' as Movie FROM tweets where upper(text) LIKE '%CIVIL%' "
#                        "UNION SELECT COUNT(*) AS NumberOfTweets, 'Avengers End Game' as Movie FROM tweets where upper(text) LIKE '%END%'")
# query3.show()
# pd = query3.toPandas()
# pd.to_csv('static/Input/byMovie.csv', index=False)
#
# # Query 4: Number of tweets for each character
#
# query4 = spark.sql("SELECT COUNT(*) AS NumberOfTweets, 'Captain America' as Character FROM tweets "
#                    "where upper(text) LIKE '%AMERICA%' UNION SELECT COUNT(*) AS NumberOfTweets,'Thanos' as Character FROM tweets "
#                    "where upper(text) LIKE '%THANOS%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Black Panther' as Character FROM tweets "
#                    "where upper(text) LIKE '%PANTHER%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Rogg' as Character FROM tweets "
#                    "where upper(text) LIKE '%ROGG%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Spider-Man' as Character FROM tweets "
#                    "where upper(text) LIKE '%SPIDER%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Iron Man' as Character FROM tweets "
#                    "where upper(text) LIKE '%IRON%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Black Widow' as Character FROM tweets "
#                    "where upper(text) LIKE '%WIDOW%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Hulk' as Character FROM tweets "
#                    "where upper(text) LIKE '%HULK%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Thor' as Character FROM tweets "
#                    "where upper(text) LIKE '%THOR%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Hawkeye' as Character FROM tweets "
#                    "where upper(text) LIKE '%HAWKEYE%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Deadpool' as Character FROM tweets "
#                    "where upper(text) LIKE '%DEADPOOL%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Loki' as Character FROM tweets "
#                    "where upper(text) LIKE '%LOKI%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Captain Marvel' as Character FROM tweets "
#                    "where upper(text) LIKE '%MARVEL%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Ant-Man' as Character FROM tweets "
#                    "where upper(text) LIKE '%ANT%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Nebula' as Character FROM tweets "
#                    "where upper(text) LIKE '%NEBULA%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Gamora' as Character FROM tweets "
#                    "where upper(text) LIKE '%GAMORA%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Groot' as Character FROM tweets "
#                    "where upper(text) LIKE '%GROOT%' UNION SELECT COUNT(*) AS NumberOfTweets, 'Nick Fury' as Character FROM tweets "
#                    "where upper(text) LIKE '%NICK%'")
# query4.show()
# pd = query4.toPandas()
# pd.to_csv('static/Input/byCharacter.csv', index=False)
#
# # Query 5: Number of tweets for each device
#
# query5 = spark.sql("SELECT COUNT(*) AS Count, 'iPhone' as Device FROM tweets where source LIKE '%iPhone%' UNION SELECT COUNT(*) "
#                    "AS Count,'Android' as Device FROM tweets where source LIKE '%Android%' UNION SELECT COUNT(*) "
#                    "AS Count,'iPad' as Device FROM tweets where source LIKE '%iPad%'")
# query5.show()
# pd = query5.toPandas()
# pd.to_csv('static/Input/byDevice.csv', index=False)

# Query 6: Number of tweets by Language

query6 = spark.sql("SELECT user.lang, count(*) AS Lang_Count FROM tweets where user.lang is "
                   "not null group by user.lang order by Lang_Count desc LIMIT 10")
query6.show()
pd = query6.toPandas()
pd.to_csv('static/Input/byLanguage.csv', index=False)


year = df.select(date_format((from_unixtime(unix_timestamp('user.created_at', 'EEE MMM dd HH:mm:ss ZZZZZ yyyy')).alias('date')),
                             'MM/dd/yyyy').alias('date'))
year.printSchema()
year.createOrReplaceTempView("year")

# Query 7: Number of tweets by Year

query7 = spark.sql("select count(*) as NumberOfTweets, substr(date, 7, 11) as MovieYear from year group by substr(date, 7, 11) "
                   "order by substr(date, 7, 11) desc")
pd = query7.toPandas()
pd.to_csv('static/Input/byYear.csv', index=False)
query7.show()

# Query 8: Hashtag Count

hashtag = df.select('text', regexp_extract(col('text'), '#(\w+)', 1).alias('hashtag'))
hashtag.createOrReplaceTempView("hashtag")

query8 = spark.sql("SELECT count(*) as count, hashtag from hashtag where hashtag is not null group by hashtag")
query8.show()
pd = query8.toPandas()
pd.to_csv('static/Input/hashtag.csv', index=False)

# Query 9: Tweets for end game by location

query9 = spark.sql("SELECT COUNT(*) AS NumberOfTweets, 'Avengers End Game' as Movie, user.location as Location "
                   "FROM tweets where upper(text) LIKE '%END%' and user.location is not null group by user.location "
                   "ORDER BY NumberOfTweets DESC LIMIT 20")
query9.show()
pd = query9.toPandas()
pd.to_csv('static/Input/byEndGameAndLocation.csv', index=False)

# Query 9: Tweets before and after the release of end game

Movieyear = df.select('text', date_format((from_unixtime(unix_timestamp('user.created_at', 'EEE MMM dd HH:mm:ss ZZZZZ yyyy')).alias('date')),
                                          'MM/dd/yyyy').alias('date'))
Movieyear.printSchema()
Movieyear.createOrReplaceTempView("movieYear")

#
query10 = spark.sql("SELECT count(date) as NumberOfTweets, 'After Release' As Avengers from movieYear where upper(text) "
                    "like '%END%' and date in ('04/22/2019', '04/23/2019', '04/24/2019', '04/25/2019', '04/26/2019') "
                    "UNION SELECT count(date) as NumberOfTweets, 'Before Release' As Avengers from movieYear "
                    "where upper(text) like '%END%' and date not in ('04/22/2019', '04/23/2019', '04/24/2019', '04/25/2019', '04/26/2019')")
query10.show()
pd = query10.toPandas()
pd.to_csv('static/Input/beforeAndAfterRelease.csv', index=False)


dateCol = query10.toPandas()
dateCol['date'] = pd.to_datetime(dateCol['date'])
range = dateCol[dateCol['date'] > '2019-04-22'].count()
print(dateCol.loc[range])

pd.to_csv('static/Output/byEndGameAndLocation.csv', index=False)


# tweets_text = []
# readTweets = open("static/Tweets/NewAvengersTweets.json", "r")
# for line in readTweets:
#     try:
#         tweet = json.loads(line)
#         tweets_text.append(tweet["text"])
#     except:
#         continue
#
# textString = ''.join(tweets_text);
#
# def extract_emojis(str):
#   my_list = []
#   my_list.append(c for c in str if c in emoji.UNICODE_EMOJI)
#   return my_list
#
# extract = extract_emojis(textString)
# print(extract)
