const fs = require("fs");
const natural = require("natural");
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// list all files in directory
const filesToRead = fs.readdirSync("./fileOutputs");

const loadDocuments = (listOfFilesToRead, tfidfObject) => {
    listOfFilesToRead.forEach((file) => {
        try {
            const data = fs.readFileSync(`./fileOutputs/${file}`, "utf8");
            tfidfObject.addDocument(data);
        } catch (err) {
            console.error(err);
        }
    });
};

const runTfIdf = (tfidfObject) => {
    tfidfObject.tfidfs("green", function(i, measure) {
        console.log("document #" + i + " has " + measure);
    });
};

const analyseDocumentScores = (documentsToAnalyse, tfidfObject) => {
    loadDocuments(documentsToAnalyse, tfidfObject);

    runTfIdf(tfidfObject);
};

analyseDocumentScores(filesToRead, tfidf);