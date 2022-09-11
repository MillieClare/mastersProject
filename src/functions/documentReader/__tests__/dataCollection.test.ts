import { gatherDataBaseData } from '../dataCollection';
import testData from './mockData.json';

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

test('return the correct data', () => {
  const results = gatherDataBaseData(testData);
  // console.log('-------- results', results);
  expect(results).toStrictEqual([{ companyName: 'ABN AMRO (2015)', country: 'Netherlands', reviewer: 'oekom research', sector: 'Financial Institution' }]);
});
