const fsPromises = require('fs/promises');
const path = require('path');

copyDir ();
async function copyDir () {
  await fsPromises.rm(path.join('04-copy-directory', 'files-copy'), {recursive : true, force : true});
  await fsPromises.mkdir(path.join('04-copy-directory', 'files-copy'));


  let files = await fsPromises.readdir(path.join('04-copy-directory', 'files'), { withFileTypes: true });
  for (let file of files) {
    if (file.isFile() === true) {
      fsPromises.copyFile(path.join('04-copy-directory', 'files', file.name), 
        path.join('04-copy-directory', 'files-copy', file.name));
    }
  }
}