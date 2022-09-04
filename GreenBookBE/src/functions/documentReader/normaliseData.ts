import wordFrequencies from './word_frequencies.json';

const sectors = new Set(wordFrequencies.map((element) => element.sector));
const sectorsArray = Array.from(sectors);

const dataObj = {
  // data from sectors
};

const range = [0, 1];

const normaliseObject = (data: any, range: any) => {
  let minMax: any = { min: null, max: null };
  Object.keys(data).forEach((key) => {
    const values: any = Object.values(data[key]);
    const min = Math.min.apply(Math, values);
    const max = Math.max.apply(Math, values);
    if (min < minMax.min || minMax.min === null) {
      minMax.min = min;
    }

    if (max > minMax.max || minMax.max === null) {
      minMax.max = max;
    }
  });
  const variation = (range[1] - range[0]) / (minMax.max - minMax.min);

  Object.keys(data).forEach((key) => {
    Object.keys(data[key]).forEach((el) => {
      const val = (range[0] + (data[key][el] - minMax.min) * variation).toFixed(2);
      data[key][el] = +val;
    });
  });
};

normaliseObject(dataObj, range);

console.log(dataObj);
