const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');


bundle();
async function bundle() {
  await fs.readdir(path.join('05-merge-styles', 'project-dist'), { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      if (file.isFile() === true && file.name === 'bundle.css') {
        fsPromises.unlink(path.join('05-merge-styles', 'project-dist', 'bundle.css'));
      }
    }
  });

  await fsPromises.appendFile(path.join('05-merge-styles', 'project-dist', 'bundle.css'), '', 'utf8');
  
  await fs.readdir(path.join('05-merge-styles', 'styles'), { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      if (file.isFile() === true) {
        let ext = path.extname(file.name).replace(/[.]/g, '');
        if (ext === 'css') {
          let fileRead = fs.createReadStream(path.join('05-merge-styles', 'styles', file.name), 'utf8');
          fileRead.on('data', function (chunk) {
            fsPromises.appendFile(path.join('05-merge-styles', 'project-dist', 'bundle.css'), chunk, 'utf8');
          });
        }
      }
    }
  });}