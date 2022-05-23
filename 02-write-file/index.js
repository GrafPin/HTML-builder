const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const process = require('process');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.writeFile(path.join('02-write-file', 'text.txt'), '' ,'utf8', function () {});
console.log('Hello student!');

process.stdin.on('data', (a) => {
  if (a == '\u0003') {
    console.log('\nThank you, goodbye!');
  }
});

record ();
function record() {
  readline.question('Enter details... ', (name) => {
    if (name=='exit') {
      console.log('Thank you, goodbye!');
      readline.close();
    }
    else {
      fsPromises.appendFile(path.join('02-write-file', 'text.txt'), name + '\n' ,'utf8');
      record();
    }
  });
}