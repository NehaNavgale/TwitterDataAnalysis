import re
import json

tweets_text = []
readTweets = open("Input/importedTweets.txt", "r")

for line in readTweets:
    try:
        tweet = json.loads(line)
        tweets_text.append(tweet)
    except:
        continue

print(len(tweets_text));