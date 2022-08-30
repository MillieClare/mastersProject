const XLSX = require('xlsx');
const fs = require('fs');

// const worksheet = XLSX.readFile('./ICMA-Sustainable-Bonds-Database-110322.xlsx');
const worksheet = XLSX.readFile('./ICMA-Sustainable-Bonds-Database-030822.xlsx');

firstSheet = worksheet.Sheets['Green Bonds Issuers'];

XLSX.utils.sheet_add_aoa(firstSheet, [
    ['Green_Bond_Issuer']
], { origin: 'A2' });
XLSX.utils.sheet_add_aoa(firstSheet, [
    ['Market Information Template Hyperlink']
], { origin: 'H2' });
XLSX.utils.sheet_add_aoa(firstSheet, [
    ['External_Review_Report_Hyperlink']
], {
    origin: 'I2'
});
XLSX.utils.sheet_add_aoa(firstSheet, [
    ['External_Review_Report_Hyperlink']
], {
    origin: 'J2'
});

for (cell in firstSheet) {
    if (!firstSheet[cell]['l']) continue;

    const hyperLink = firstSheet[cell]['l']['Target'];
    const cellSplit = cell.match(/[a-zA-Z]+|[0-9]+/g);
    const cellLetter = cellSplit[0];
    const cellNumber = cellSplit[1];

    if (cellSplit[0] == 'D') {
        XLSX.utils.sheet_add_aoa(firstSheet, [
            [hyperLink]
        ], {
            origin: 'H' + cellNumber
        });
        // } else if (cellSplit[0] == 'E') {
        //     XLSX.utils.sheet_add_aoa(firstSheet, [
        //         [hyperLink]
        //     ], {
        //         origin: 'I' + cellNumber
        //     });
    } else if (cellSplit[0] == 'F') {
        XLSX.utils.sheet_add_aoa(firstSheet, [
            [hyperLink]
        ], {
            origin: 'J' + cellNumber
        });
    }
}

const jsa = XLSX.utils.sheet_to_json(firstSheet, { range: 1 });

fs.writeFile(`../json/ICMA-Sustainable-Bonds-Database-110322.json`, JSON.stringify(jsa), (err) => {
    if (err) {
        console.error(err);
        return;
    }
});

console.log(jsa);