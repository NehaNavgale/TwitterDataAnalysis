import time, re
from pyspark import SparkContext, SparkConf

import re
import json

tweets_text = []
readTweets = open("importedTweets.txt", "r")
for line in readTweets:
    try:
        tweet = json.loads(line)
        tweets_text.append(tweet["text"])
    except:
        continue

textString = ''.join(tweets_text);

def getHashTags(text):
    tags = re.findall(r"#(\w+)", text);
    return tags

hashTags = getHashTags(textString)

def getURLS(text):
    urlText = re.findall(r'(https?://\S+)', text);
    return urlText

urlsText = getURLS(textString)

def getCount(text, fileName):
    conf = SparkConf().setAppName("Words count").setMaster("local")
    sc = SparkContext(conf=conf)

    text_file = sc.parallelize(text)

    # text_file = sc.textFile("importTweets.txt")
    counts = text_file.flatMap(lambda line: line.split(" ")) \
        .map(lambda word: (word, 1)) \
        .reduceByKey(lambda a, b: a + b)
    counts.saveAsTextFile("Output/"+fileName)
    sc.stop()

def main():
    getCount(hashTags, "hashtagCountSpark.txt")
    getCount(urlsText, "urlCountSpark.txt")


if __name__ == "__main__":
    main()