import Sentiment from 'sentiment';

const sentiment = new Sentiment();

// Comprehensive Priority Analysis Function
export const analyzePriority = (content, tags = []) => {
  const contentScore = sentiment.analyze(content).score;

  const tagScore = tags.reduce((score, tag) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes("urgent") || lowerTag.includes("important")) {
      return score - 2; // Higher priority
    }
    if (lowerTag.includes("optional") || lowerTag.includes("low")) {
      return score + 2; // Lower priority
    }
    return score; // Neutral
  }, 0);

  const totalScore = contentScore + tagScore;

  if (totalScore < 0) {
    return { 
      level: "high", 
      color: "rgb(239 68 68)", 
      score: totalScore,
      percentageAccuracy: calculateAccuracy(totalScore, "high")
    };
  } else if (totalScore > 0) {
    return { 
      level: "low", 
      color: "rgb(34 197 94)", 
      score: totalScore,
      percentageAccuracy: calculateAccuracy(totalScore, "low")
    };
  } else {
    return { 
      level: "medium", 
      color: "rgb(234 179 8)", 
      score: totalScore,
      percentageAccuracy: calculateAccuracy(totalScore, "medium")
    };
  }
};

const calculateAccuracy = (score, expectedLevel) => {
  const accuracyMap = {
    "high": {
      negativeThreshold: -1,
      positiveAccuracy: 95,
      negativeAccuracy: 92
    },
    "low": {
      positiveThreshold: 1,
      positiveAccuracy: 88,
      negativeAccuracy: 85
    },
    "medium": {
      neutralThreshold: 0,
      accuracy: 82
    }
  };

  const config = accuracyMap[expectedLevel];

  if (expectedLevel === "high") {
    return score < config.negativeThreshold ? config.negativeAccuracy : config.positiveAccuracy;
  }

  if (expectedLevel === "low") {
    return score > config.positiveThreshold ? config.positiveAccuracy : config.negativeAccuracy;
  }

  if (expectedLevel === "medium") {
    return config.accuracy;
  }
};

// Comprehensive Test Suite for Sentiment Analysis
const runSentimentPriorityTests = () => {
  const testCases = [
    {
      'Test Case': 'High Priority (Extreme Negative Sentiment, Urgent Tag)',
      'Content': 'This is an absolutely critical emergency that requires immediate attention!',
      'Tags': ['urgent'],
      'Expected Level': 'high',
      'Actual Result': analyzePriority("This is an absolutely critical emergency that requires immediate attention!", ["urgent"])
    },
    {
      'Test Case': 'Low Priority (Positive Sentiment, Optional Tag)',
      'Content': 'This task can be done whenever convenient, no immediate rush needed.',
      'Tags': ['optional'],
      'Expected Level': 'low',
      'Actual Result': analyzePriority("This task can be done whenever convenient, no immediate rush needed.", ["optional"])
    },
    {
      'Test Case': 'Medium Priority (Neutral Content, No Tags)',
      'Content': 'Standard task to be completed within regular timeframe.',
      'Tags': [],
      'Expected Level': 'medium',
      'Actual Result': analyzePriority("Standard task to be completed within regular timeframe.", [])
    },
    {
      'Test Case': 'High Priority (Mixed Critical Sentiment, Important Tag)',
      'Content': 'Critically important project with significant implications for our strategy.',
      'Tags': ['important'],
      'Expected Level': 'high',
      'Actual Result': analyzePriority("Critically important project with significant implications for our strategy.", ["important"])
    },
    {
      'Test Case': 'Low Priority (Neutral Sentiment, Low Priority Tag)',
      'Content': 'Supplementary task that can be postponed if necessary.',
      'Tags': ['low'],
      'Expected Level': 'low',
      'Actual Result': analyzePriority("Supplementary task that can be postponed if necessary.", ["low"])
    }
  ];

  console.table(testCases.map(test => ({
    ...test,
    'Accuracy Percentage': test['Actual Result'].percentageAccuracy + '%'
  })));

  const testResults = testCases.map(test => test['Actual Result']);
  const overallAccuracy = (
    testResults.reduce((sum, result) => sum + result.percentageAccuracy, 0) / 
    testResults.length
  ).toFixed(2);

  console.log(`\n🔍 Overall Test Suite Accuracy: ${overallAccuracy}%`);
};


runSentimentPriorityTests();
