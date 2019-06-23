**Project Objective:**

Our main objective is to develop a system which stores, analyze and visualize the twitter's tweets. We have divided this project into 3 phases.

**Phase 1**

Objective for Phase-1
1.	Collect Tweets using Twitter’s Streaming APIs (around 100K Tweets) (refer file getTweets.py in Phase 1 folder)
2.	Extracting Hashtags and URLs from the tweets (refer file parseTweets.py, extractedHashtags.txt and extractedURLs.txt file)
3.	Running WordCount program using Apache Hadoop and Apache Spark on extracted HashTags and URLs (refer HadoopTwitterOuput and SparkTwitterOutput folder)
4.	Collect the log files and output from Hadoop(refer to Logs folder)

**Please refer to given links for **
1. Phase-1 Report: https://github.com/NehaNavgale/TwitterDataAnalysis/wiki/Phase1-Report
2. Phase-2 Report: https://github.com/NehaNavgale/TwitterDataAnalysis/wiki/Phase-2-Report


........................................................................................................................................................................................................................................
**Commmand to download our Dockarized application:**

docker pull nehanavgale/twitter:latest

docker run -p 4000:80 nehanavgale/twitter:latest
