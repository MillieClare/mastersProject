'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const stopWords_1 = __importDefault(require('./stopWords'));
const filesToRead = fs_1.default.readdirSync(path_1.default.resolve(__dirname, '../../assets/files/fileOutputs'));
const ICMA_Sustainable_Bonds_Database_110322_json_1 = __importDefault(require('../../assets/files/json/ICMA-Sustainable-Bonds-Database-030822.json'));
const countWordFrequency = (filesToRead) => {
    let counter = 0;
    const wordFrequenciesPerDocument = filesToRead.map((element) => {
        const elementContents = fs_1.default.readFileSync(`../../assets/files/fileOutputs/${element}`, 'utf-8');
        const companyName = element.split('.')[0];
        const elementTextToLowercase = elementContents.toLowerCase();
        const regex = /[^A-Za-z0-9]/g;
        let result = elementTextToLowercase
            .replace(regex, ' ')
            .split(/\s/)
            .reduce(
                (map, word) =>
                Object.assign(map, {
                    [word]: map[word] ? map[word] + 1 : 1
                }), {}
            );
        for (const [key] of Object.entries(result)) {
            for (let i = 0; i < stopWords_1.default.length; i++) {
                if (stopWords_1.default[i] === key) {
                    delete result[key];
                }
            }
        }
        console.log((result = maxValues(result, 6)), (result.companyName = ICMA_Sustainable_Bonds_Database_110322_json_1.default[counter].Green_Bond_Issuer), (result.fileName = companyName));
        counter++;

        return result;
    });
    // for (let i = 0; i < wordFrequenciesPerDocument.length; i++) {
    //     console.log(wordFrequenciesPerDocument);
    // }
    // process.stdout.write(JSON.stringify(wordFrequenciesPerDocument) + '\n');
    return wordFrequenciesPerDocument;
};

function maxValues(o, n) {
    // Get object values and sort descending
    const values = Object.values(o).sort((a, b) => b - a);
    // Check if more values exist than number required
    if (values.length <= n) return o;
    // Find nth maximum value
    const maxN = values[n - 1];
    // Filter object to return only key/value pairs where value >= maxN
    const result = Object.entries(o).reduce(
        (o, [k, v]) =>
        v >= maxN ?
        Object.assign(Object.assign({}, o), {
            [k]: v
        }) :
        o, {}
    );
    // function will return more than n entries if there are words with the same frequency
    // sort and then take first 5
    const resultsSorted = Object.fromEntries(Object.entries(result).sort(([, a], [, b]) => b - a));
    const cutObject = (obj, max) =>
        Object.keys(obj)
        .filter((key, index) => index < max)
        .map((key) => ({
            [key]: obj[key]
        }));
    return cutObject(resultsSorted, 6);
}
// map company name to JSON object
const joinData = (wordData, companyJson) => {
    // const dataStuff = wordData.map((element: any) => {
    //   if(wordData.companyName === companyJson.) {
    //   }
    // });
};
// countWordFrequency(filesToRead);
joinData(countWordFrequency(filesToRead), ICMA_Sustainable_Bonds_Database_110322_json_1.default);