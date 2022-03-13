const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const fs = require("fs");
const stopwords = require("stopwords-en");

// list files in a directory
const filesToRead = fs.readdirSync("./corpus");

function pdfToText(url, separator = " ") {
  let pdf = pdfjsLib.getDocument(url);
  return pdf.promise.then(function (pdf) {
    // get all pages text
    let maxPages = pdf._pdfInfo.numPages;
    let countPromises = []; // collecting all page promises
    for (let i = 1; i <= maxPages; i++) {
      let page = pdf.getPage(i);
      countPromises.push(
        page.then(function (page) {
          // add page promise
          let textContent = page.getTextContent();
          return textContent.then(function (text) {
            // return content promise
            return text.items

              .map(function (obj) {
                return obj.str;
              })
              .join(separator); // value page text
          });
        })
      );
    }
    // wait for all pages and join text
    return Promise.all(countPromises).then(function (texts) {
      for (let i = 0; i < texts.length; i++) {
        texts[i] = texts[i].replace(/\s+/g, " ").trim();
      }
      return texts;
    });
  });
}

function removeStopwords(text) {
  const res = [];
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    let checkWord = words[i].split(".").join("");
    if (!stopwords.includes(checkWord)) {
      res.push(checkWord);
    }
  }
  return res.join(" ");
}

const updateTextFiles = (listOfFiles) => {
  listOfFiles.forEach((file) => {
    pdfToText(`./corpus/${file}`).then(
      function (pdfTexts) {
        const txtFileName = file.split(".")[0];
        pdfTexts = pdfTexts.toString();
        pdfTexts = removeStopwords(pdfTexts);
        fs.writeFile(
          `./fileOutputs/${txtFileName}.txt`,
          pdfTexts.toString(),
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      },
      function (reason) {
        console.error(reason);
      }
    );
  });
};

updateTextFiles(filesToRead);
