from textblob import TextBlob

def analyze_sentiment(text):
    """
    Analyze sentiment of a given text.
    """
    blob = TextBlob(text)
    return blob.sentiment.polarity

def get_news_sentiment(news_articles):
    """
    Get sentiment scores for a list of news articles.
    """
    sentiment_scores = [analyze_sentiment(article) for article in news_articles]
    return sum(sentiment_scores) / len(sentiment_scores) if sentiment_scores else 0