"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const averageDataProcessing_1 = require("../averageDataProcessing");
const dataCollection_1 = require("../dataCollection");
const mockData_json_1 = __importDefault(require("./mockData.json"));
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const mockAverageDataProcessing = [['Agency', 'climate', 0.3739279588, 4.5649431151, 52.9533401346]];
const mockTopSectorWords = [
    {
        'ABANCACorporacinBancariaS.txt': {
            energy: 51,
            environmental: 32.5378277861242,
            management: 15.73553116878063,
            party: 35.37153650105044,
            buildings: 1.1823215567939547,
            sustainability: 29.487406431175053
        }
    }
];
const mockSentimentAnalysis = [{ companyName: 'ABANCACorporacinBancariaS', sentimentScore: 0.0003125488357555868 }];
const mockJsonMongo = [
    {
        companyName: 'ABANCA Corporación Bancaria, S. A.',
        country: 'Spain',
        sector: 'Financial Institution',
        sentimentScore: 0.5,
        reviewer: 'SUSTAINALYTICS',
        reviewLink: 'https://www.icmagroup.org/Emails/icma-vcards/Abanca_External%20Review%20Report.pdf',
        marketInformationDate: 'September 2021',
        marketInformationLink: 'https://www.icmagroup.org/Emails/icma-vcards/Abanca%20-%20Market%20Information%20Template_Green%20Bonds.pdf'
    }
];
const mockWordFrequencies = [
    {
        frequentWords: '[{"energy":51},{"party":32},{"environmental":32},{"renewable":29},{"sustainability":29},{"development":28}]',
        companyName: 'ABANCA Corporación Bancaria, S. A.',
        fileName: 'ABANCACorporacinBancariaS',
        sector: 'Financial Institution'
    },
    {
        frequentWords: '[{"buildings":120},{"energy":89},{"loans":64},{"performance":54},{"co2":49},{"residential":47}]',
        companyName: 'ABN AMRO (2015)',
        fileName: 'ABN_AMRO_2015_External_review_report',
        sector: 'Financial Institution'
    }
];
const mockSectors = ['Financial Institution'];
const mockNegativeSentence = 'I hated the film, it was awful and horrible.';
const mockPositiveSentence = 'I loved the film, it was wonderful and amazing.';
const mockTextToAnalyse = `Are sentiments apartments decisively the especially alteration. 
After nor you leave might share court balls.
Of on am father by agreed supply rather either. 
Own handsome delicate its property mistress her end appetite. 
Mean are sons too sold nor said.
By impossible of in difficulty discovered celebrated ye. 
Esteem my advice it an excuse enable. 
Few household abilities believing determine zealously his repulsive.`;
// tests
// averageDataProcessing
test('when given an array the function returns objects in correct formant', () => {
    const result = (0, averageDataProcessing_1.gatherAverageData)(mockAverageDataProcessing);
    expect(result).toEqual([{ sectorName: 'Agency', word: 'climate', normalisedScore: 0.3739279588, minValue: 4.5649431151, max90Value: 52.9533401346 }]);
});
// dataCollection
test('return the correct data for gatherDataBaseData', () => {
    const results = (0, dataCollection_1.gatherDataBaseData)(mockData_json_1.default);
    expect(results).toStrictEqual([
        {
            companyName: 'ABANCA Corporación Bancaria, S. A.',
            country: 'Spain',
            sector: 'Financial Institution',
            reviewer: 'SUSTAINALYTICS',
            reviewLink: 'https://www.icmagroup.org/Emails/icma-vcards/Abanca_External%20Review%20Report.pdf',
            marketInformationDate: 'September 2021',
            marketInformationLink: 'https://www.icmagroup.org/Emails/icma-vcards/Abanca%20-%20Market%20Information%20Template_Green%20Bonds.pdf'
        }
    ]);
});
test('return the correct data for getDataForScoresAndGraphs', () => {
    const results = (0, dataCollection_1.getDataForScoresAndGraphs)(mockTopSectorWords, mockSentimentAnalysis, mockJsonMongo);
    expect(results).toStrictEqual([
        {
            companyName: 'ABANCA Corporación Bancaria, S. A.',
            sentimentScore: 0.5,
            sector: 'Financial Institution',
            topCompanyWords: {
                energy: 51,
                environmental: 32.5378277861242,
                management: 15.73553116878063,
                party: 35.37153650105044,
                buildings: 1.1823215567939547,
                sustainability: 29.487406431175053
            }
        }
    ]);
});
// sectorWordAnalysis
// test('return the correct data for frequentWordsPerSector (sorted, top 6 words)', () => {
//   const results = frequentWordsPerSector(mockSectors);
//   const reports = mockTopSectorWords;
//   expect(results).toStrictEqual(['bla']);
// });
// sentiment analysis
test('negative sentence recieves negative score', () => {
    const results = sentiment.analyze(mockNegativeSentence).comparative;
    expect(results).toStrictEqual(-0.75);
});
test('positive sentence recieves positive score', () => {
    const results = sentiment.analyze(mockPositiveSentence).comparative;
    expect(results).toStrictEqual(0.75);
});
// text analysis
// test('return word frequencies for the text', () => {
//   const results = countWordFrequency(mockTextToAnalyse);
//   expect(results).toStrictEqual(['bla']);
// });
