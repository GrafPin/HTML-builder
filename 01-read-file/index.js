const fs = require('fs');
const path = require('path');
let data = '';

let fileRead = fs.createReadStream(path.join('01-read-file', 'text.txt'), 'utf8');
fileRead.on('data', function (chunk) {
  data += chunk; });
fileRead.on('end', function () {
  console.log(data); });