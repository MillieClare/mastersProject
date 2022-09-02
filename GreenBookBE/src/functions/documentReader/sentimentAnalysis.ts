import fs from 'fs';
import path from 'path';
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const filesToRead = fs.readdirSync(path.resolve(__dirname, '../../assets/files/fileOutputs'));

const getSentimentScore = (filesToRead: any) => {
  const scorePerDocument = filesToRead.map((element: any, index: number) => {
    const elementContents = fs.readFileSync(`../../assets/files/fileOutputs/${element}`, 'utf-8');
    const result = sentiment.analyze(elementContents);
    const resultObject = {
      companyName: element.split('.txt')[0],
      sentimentScore: result.comparative
    };
    return resultObject;
  });
  return scorePerDocument;
};

const createListOfSentimentScores = (jsonFile: any) => {
  fs.writeFile(`./sentimentAnalysisResults.json`, JSON.stringify(jsonFile), (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const json = getSentimentScore(filesToRead);
createListOfSentimentScores(json);
