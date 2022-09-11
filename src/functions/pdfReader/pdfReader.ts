const pdfjsLib = require('pdfjs-dist');
const fs = require('fs');
const http = require('http');
const https = require('https');
const natural = require('natural');

const filesToRead = fs.readdirSync('../../assets/files/corpus');
const pdfsAsJson = require('../../assets/files/json/ICMA-Sustainable-Bonds-Database-110322.json');

const downloadPdfs = (fileUrl: string, fileName: string) => {
  fileName = fileName.replace(/[^a-zA-Z0-9-().]/g, '');
  const isHttp = fileUrl.split(':');
  if (isHttp[0] === 'http') {
    http.get(fileUrl, (res: any) => {
      const path = `../../assets/files/corpus/${fileName}.pdf`;
      const writeStream = fs.createWriteStream(path);
      res.pipe(writeStream);
      writeStream.on('finish', () => {
        writeStream.close();
        console.log('------------Download Completed!');
      });
    });
  } else if (isHttp[0] === 'https') {
    https.get(fileUrl, (res: any) => {
      const path = `../../assets/files/corpus/${fileName}.pdf`;
      const writeStream = fs.createWriteStream(path);
      res.pipe(writeStream);
      writeStream.on('finish', () => {
        writeStream.close();
        console.log('------------Download Completed!');
      });
    });
  } else {
    console.log('Error, file is neither http or https', fileName);
  }
};

const getPdfs = (pdfs: []) => {
  pdfs.forEach((pdf: any) => {
    if (pdf.hasOwnProperty('External_Review_Report_Hyperlink_1')) {
      const fileName = pdf.Green_Bond_Issuer;
      const fileLink = pdf.External_Review_Report_Hyperlink_1;

      downloadPdfs(fileLink, fileName);
    }
  });
};

const pdfToText = async (url: string, separator = ' ') => {
  let pdf = pdfjsLib.getDocument({ url: url });
  return pdf.promise.then(function (pdf: any) {
    // get all pages text
    let maxPages = pdf._pdfInfo.numPages;
    let countPromises = []; // collecting all page promises
    for (let i = 1; i <= maxPages; i++) {
      let page = pdf.getPage(i);
      countPromises.push(
        page.then(function (page: any) {
          // add page promise
          let textContent = page.getTextContent();
          return textContent.then(function (text: any) {
            // return content promise
            return text.items
              .map(function (obj: any) {
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
        texts[i] = texts[i].replace(/\s+/g, ' ').trim();
      }
      return texts;
    });
  });
};

const updateTextFiles = (listOfFiles: []) => {
  listOfFiles.forEach((file: any) => {
    file = file.split('.pdf')[0];
    const fileToRead = `../../assets/files/corpus/${file}.pdf`;
    pdfToText(fileToRead).then(
      function (pdfTexts) {
        pdfTexts = pdfTexts.join(' ');
        const regex = /[^A-Za-z0-9]/g;
        pdfTexts = pdfTexts.replace(regex, ' ');
        fs.writeFile(`../../assets/files/fileOutputs/${file}.txt`, pdfTexts.toString(), (err: any) => {
          if (err) {
            console.error(err);
            console.log('THIS IS AN ERROR FILE DID NOT WRITE');
            return;
          } else {
            console.log('FILE DID WRITE');
          }
        });
      },
      function (reason) {
        console.error(reason);
      }
    );
  });
};

// getPdfs(pdfsAsJson);
updateTextFiles(filesToRead);

module.exports = {
  getPdfs,
  downloadPdfs,
  updateTextFiles,
  pdfToText
};
