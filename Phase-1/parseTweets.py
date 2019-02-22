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

def getURLS(text):
    urlText = re.findall(r'(https?://\S+)', text);
    return urlText


hashTags = getHashTags(textString);
urlsText = getURLS(textString);

with open('extractedURLs.txt', 'w') as urlFile:
    for item in urlsText:
        urlFile.write("%s\n" %item)
#
# with open('extractedHashtags.txt', 'w') as tagFile:
#     for item in hashTags:
#         tagFile.write("%s\n" %item)
#


