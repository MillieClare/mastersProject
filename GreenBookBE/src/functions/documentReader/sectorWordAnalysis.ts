import wordFrequencies from './word_frequencies.json';
const natural = require('natural');
const fs = require('fs');
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

const sectors = new Set(wordFrequencies.map((element) => element.sector));
const sectorsArray = Array.from(sectors);
// console.log(sectors);

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

    // console.log('totals', totals);

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

const tfidfForTopWordsWithinSectors = (sectors: Array<String>) => {
  const tfidfScores = sectors.map((sector) => {
    const reports = wordFrequencies.filter((record) => record.sector === sector);
    const getFilesInSector: any = [];
    reports.map((reportToGet) => getFilesInSector.push(reportToGet.fileName + '.txt'));
    // console.log(getFilesInSector);

    const loadDocuments = (listOfFilesToRead: [], tfidfObject: any) => {
      console.log(tfidfObject.documents.length());
      // console.log('===========================list of files to read', listOfFilesToRead);
      // console.log({ listOfFilesToRead });
      listOfFilesToRead.forEach((file: any) => {
        // console.log({ file });
        try {
          const data = fs.readFileSync(`../../assets/files/fileOutputs/${file}`, { encoding: 'utf8', flag: 'r' });
          tfidfObject.addDocument(data);
          // console.log({ data });
        } catch (err) {
          console.error(err);
        }
      });
    };

    const runTfIdf = (tfidfObject: any) => {
      tfidfObject.tfidfs('climate', function (i: number, measure: number) {
        // console.log('document #' + i + ' has ' + measure);
      });
    };

    const analyseDocumentScores = (documentsToAnalyse: [], tfidfObject: any) => {
      console.log('before**************************************************************************************************************************', tfidfObject);
      loadDocuments(documentsToAnalyse, tfidfObject);
      console.log('after**************************************************************************************************************************', tfidfObject);

      runTfIdf(tfidfObject);
    };

    analyseDocumentScores(getFilesInSector, tfidf);
  });
};

tfidfForTopWordsWithinSectors(sectorsArray);

// console.log(frequentWordsPerSector(sectorsArray));
