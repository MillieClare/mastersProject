import wordFrequencies from './word_frequencies.json';
const natural = require('natural');
const fs = require('fs');
const TfIdf = natural.TfIdf;

const sectors = new Set(wordFrequencies.map((element) => element.sector));
const sectorsArray = Array.from(sectors);

const frequentWordsPerSector = (sectors: Array<String>) => {
  const wordFrequenciesPerSector = sectors.map((sector) => {
    const reports = wordFrequencies.filter((record) => record.sector === sector);
    const reportWords = reports.map((element) => JSON.parse(element.frequentWords));
    const wordArray: any = [];
    reportWords.map((object) => {
      object.map((element: any) => wordArray.push(element));
    });
    const totals = wordArray.reduce((a: any, obj: any) => {
      const [k, v] = Object.entries(obj)[0];
      a[k] = (a[k] || 0) + v;
      return a;
    }, {});
    const totalsSorted = Object.fromEntries(Object.entries(totals).sort(([, a]: any, [, b]: any) => b - a));
    const cutObject = (obj: any, max: number) =>
      Object.keys(obj)
        .filter((key, index) => index < max)
        .map((key) => ({
          [key]: obj[key]
        }));
    const topSixWordsPerSector = {
      sector: sector,
      words: JSON.stringify(cutObject(totalsSorted, 6))
    };

    return topSixWordsPerSector;
  });
  return wordFrequenciesPerSector;
};

const tfidfScores = (sectorData: any) => {
  const results = sectorData.map((entry: any) => {
    const tfidf = new TfIdf();

    const getFilesInSector: any = [];
    const reports = wordFrequencies.filter((record: any) => record.sector === entry.sector);
    reports.map((reportToGet) => getFilesInSector.push(reportToGet.fileName + '.txt'));
    const loadDocuments = (listOfFilesToRead: any, tfidfObject: any) => {
      return new Promise((resolve, reject) => {
        listOfFilesToRead.forEach((file: any) => {
          try {
            const data = fs.readFileSync(`../../assets/files/fileOutputs/${file}`, { encoding: 'utf8', flag: 'r' });
            tfidfObject.addDocument(data);
          } catch (err) {
            console.error(err);
          }
        });
        return resolve(tfidfObject);
      });
    };
    const runTfIdf = (tfidfObject: any) => {
      const wordsObjectArray = JSON.parse(entry.words);
      const flattenedWordsArray = Object.assign({}, ...wordsObjectArray);
      let resultsObject: any = {};
      getFilesInSector.map((reportName: any, index: any) => {
        resultsObject[entry.sector] = entry.sector;
        resultsObject[reportName] = {};
      });
      Object.keys(flattenedWordsArray).forEach((word, wordIndex) => {
        tfidfObject.tfidfs(word, function (i: any, measure: any) {
          resultsObject[getFilesInSector[i]][word] = measure;
        });
      });
      return resultsObject;
    };
    const getDocuments = loadDocuments(getFilesInSector, tfidf);
    const results = runTfIdf(getDocuments);

    console.log(results);

    return results;
  });
  return results;
};

const createListOfTopSectorWords = (jsonFile: any) => {
  fs.writeFile(`./topSectorWords.json`, JSON.stringify(jsonFile), (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const json = tfidfScores(frequentWordsPerSector(sectorsArray));
createListOfTopSectorWords(json);
