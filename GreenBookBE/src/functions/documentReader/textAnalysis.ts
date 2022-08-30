import fs from 'fs';
import path from 'path';
import stopWords from './stopWords';

const filesToRead = fs.readdirSync(path.resolve(__dirname, '../../assets/files/fileOutputs'));
import jsonFiles from './JSON_for_mongo.json';

const countWordFrequency = (filesToRead: any) => {
  let counter: number = 0;
  const wordFrequenciesPerDocument = filesToRead.map((element: any) => {
    const elementContents = fs.readFileSync(`../../assets/files/fileOutputs/${element}`, 'utf-8');

    const companyName = element.split('.')[0];

    const elementTextToLowercase = elementContents.toLowerCase();
    const regex = /[^A-Za-z0-9]/g;
    let result = elementTextToLowercase
      .replace(regex, ' ')
      .split(/\s/)
      .reduce((map: any, word: string) => Object.assign(map, { [word]: map[word] ? map[word] + 1 : 1 }), {});

    for (const [key] of Object.entries(result)) {
      for (let i = 0; i < stopWords.length; i++) {
        if (stopWords[i] === key) {
          delete result[key];
        }
      }
    }
    result = maxValues(result, 6);
    const objectToReturn = {
      frequentWords: JSON.stringify(result),
      companyName: jsonFiles[counter].companyName,
      fileName: companyName,
      sector: jsonFiles[counter].sector
    };
    counter++;

    return objectToReturn;
  });
  console.log(wordFrequenciesPerDocument);
  return wordFrequenciesPerDocument;
};

function maxValues(o: any, n: number) {
  // Get object values and sort descending
  const values = Object.values(o).sort((a: any, b: any) => b - a);

  // Check if more values exist than number required
  if (values.length <= n) return o;

  // Find nth maximum value
  const maxN: any = values[n - 1];

  // Filter object to return only key/value pairs where value >= maxN
  const result = Object.entries(o).reduce((o: any, [k, v]: any) => (v >= maxN ? { ...o, [k]: v } : o), {});

  // function will return more than n entries if there are words with the same frequency
  // sort and then take first 5
  const resultsSorted = Object.fromEntries(Object.entries(result).sort(([, a]: any, [, b]: any) => b - a));
  const cutObject = (obj: any, max: number) =>
    Object.keys(obj)
      .filter((key, index) => index < max)
      .map((key) => ({ [key]: obj[key] }));

  return cutObject(resultsSorted, 6);
}

const createListOfFrequentWords = (jsonFile: any) => {
  fs.writeFile(`./word_frequencies.json`, JSON.stringify(jsonFile), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const Json = countWordFrequency(filesToRead);
createListOfFrequentWords(Json);
