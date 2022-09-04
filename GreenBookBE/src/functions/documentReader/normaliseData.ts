import wordFrequencies from './word_frequencies.json';

const sectors = new Set(wordFrequencies.map((element) => element.sector));
const sectorsArray = Array.from(sectors);

const getMaximumFromSector = () => {
  sectorsArray.map((sector) => {
    const reports = wordFrequencies.filter((record) => record.sector === sector);
    console.log('=====================', reports.length);
    let allWordsArray: any = [];
    reports.map((entry) => {
      allWordsArray = allWordsArray.concat([entry.frequentWords]);
    });
    console.log(allWordsArray);
  });
};

const getMinimumFromSector = () => {};

function getObjKey(obj: any, value: string) {
  return Object.keys(obj).find((key) => obj[key] === value);
}

getMaximumFromSector();
