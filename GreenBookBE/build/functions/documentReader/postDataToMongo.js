"use strict";
const companyJsonToPush = require('./JSON_for_mongo.json');
// const graphDataToPush = require('./JSON_for_graph_data.json');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const postDataToMongoCompanies = (companies) => {
    return companies.forEach((element) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:2107/companies/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(element));
    });
};
postDataToMongoCompanies(companyJsonToPush);
// const postDataToMongoGraphData = (graphData: Record<string, any>) => {
//   return graphData.forEach((element: any) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://localhost:2107/graphData/', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify(element));
//   });
// };
// postDataToMongoGraphData(graphDataToPush);
