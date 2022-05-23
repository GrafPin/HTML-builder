const fs = require('fs');
const path = require('path');

fs.readdir(path.join('03-files-in-folder', 'secret-folder'), { withFileTypes: true }, (err, files) => {
  for (let file of files) {
    if (file.isFile() === true) {
      let ext = path.extname(file.name).replace(/[.]/g, '');
      let name = file.name.replace(path.extname(file.name), '');
      fs.stat(path.join('03-files-in-folder', 'secret-folder', file.name), (err, stats) => {
        console.log(name + ' - ' + ext + ' - ' + stats.size / 1000 + 'kb');
      });
    }
  }
});