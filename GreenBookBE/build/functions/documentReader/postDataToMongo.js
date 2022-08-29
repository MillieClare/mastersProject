"use strict";
const jsonToPush = require('./JSON_for_mongo.json');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const postDataToMongo = (companies) => {
    return companies.forEach((element) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:2107/companies/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(element));
    });
};
postDataToMongo(jsonToPush);
