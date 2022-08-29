"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const stopWords_1 = __importDefault(require("./stopWords"));
const filesToRead = fs_1.default.readdirSync(path_1.default.resolve(__dirname, '../../assets/files/fileOutputs'));
const countWordFrequency = (filesToRead) => {
    const wordFrequenciesPerDocument = filesToRead.map((element) => {
        // const result = numberOfWords(element);
        // console.log(result);
        const elementContents = fs_1.default.readFileSync(`../../assets/files/fileOutputs/${element}`, 'utf-8');
        // const elementContents = fs.readFileSync(`../../assets/files/fileOutputs/ABANCACorporacinBancariaS.txt`, 'utf-8');
        const elementTextToLowercase = elementContents.toLowerCase();
        const regex = /[^A-Za-z0-9]/g;
        const result = elementTextToLowercase
            .replace(regex, ' ')
            .split(/\s/)
            .reduce((map, word) => Object.assign(map, { [word]: map[word] ? map[word] + 1 : 1 }), {});
        for (const [key] of Object.entries(result)) {
            for (let i = 0; i < stopWords_1.default.length; i++) {
                if (stopWords_1.default[i] === key) {
                    delete result[key];
                }
            }
        }
        console.log(maxValues(result, 5));
    });
    return wordFrequenciesPerDocument;
};
function maxValues(o, n) {
    // Get object values and sort descending
    const values = Object.values(o).sort((a, b) => b - a);
    // Check if more values exist than number required
    if (values.length <= n)
        return o;
    // Find nth maximum value
    const maxN = values[n - 1];
    // Filter object to return only key/value pairs where value >= maxN
    const result = Object.entries(o).reduce((o, [k, v]) => (v >= maxN ? Object.assign(Object.assign({}, o), { [k]: v }) : o), {});
    // function will return more than n entries if there are words with the same frequency
    // sort and then take first 5
    const resultsSorted = Object.fromEntries(Object.entries(result).sort(([, a], [, b]) => b - a));
    const cutObject = (obj, max) => Object.keys(obj)
        .filter((key, index) => index < max)
        .map((key) => ({ [key]: obj[key] }));
    return cutObject(resultsSorted, 5);
}
countWordFrequency(filesToRead);
