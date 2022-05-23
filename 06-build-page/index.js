const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
let htmlData = '';
let data = '';
let indexData = '';

let fileRead = fs.createReadStream(path.join('06-build-page', 'template.html'), 'utf8');
fileRead.on('data', function (chunk) {
  data = chunk;});

projectBuild ();
async function projectBuild () {
  
  await fsPromises.rm(path.join('06-build-page', 'project-dist'), {recursive : true, force : true});
  await fsPromises.mkdir(path.join('06-build-page', 'project-dist'));
  await fsPromises.writeFile(path.join('06-build-page', 'project-dist', 'index.html'), data ,'utf8');
  await componentSearch ();
  await bundle ();
  await copyDir (pathAss, pathAssCopy);
}

async function bundle() {
  await fsPromises.appendFile(path.join('06-build-page', 'project-dist', 'style.css'), '', 'utf8');
  
  fs.readdir(path.join('06-build-page', 'styles'), { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      if (file.isFile() === true) {
        let ext = path.extname(file.name).replace(/[.]/g, '');
        if (ext === 'css') {
          let fileRead = fs.createReadStream(path.join('06-build-page', 'styles', file.name), 'utf8');
          fileRead.on('data', function (chunk) {
            fsPromises.appendFile(path.join('06-build-page', 'project-dist', 'style.css'), chunk, 'utf8');
          });
        }
      }
    }
  });}

  
let pathAss = path.join('06-build-page', 'project-dist', 'assets');
let pathAssCopy = path.join('06-build-page', 'assets');
async function copyDir (a, b) {
  await fsPromises.mkdir((a));

  fs.readdir(b, { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      if (file.isFile() === false) {
        pathAss = path.join(a, file.name);
        pathAssCopy = path.join(b, file.name);
        copyDir (pathAss, pathAssCopy);
      }
      if (file.isFile() === true) {
        fsPromises.copyFile(path.join(b, file.name), 
          path.join(a, file.name));
      }
    }
  });
}

async function componentSearch () {
  let files = await fsPromises.readdir(path.join('06-build-page', 'components'), { withFileTypes: true });
  for await (let file of files) {
    let ext = path.extname(file.name).replace(/[.]/g, '');
    let name = file.name.replace(path.extname(file.name), '');
    if (file.isFile() === true && ext === 'html') {
      let components = fs.createReadStream(path.join('06-build-page', 'components', file.name), 'utf8');
      components.on('data', function (chunk) {
        htmlData = chunk;});
      let indexHtml = await fsPromises.readFile(path.join('06-build-page', 'project-dist', 'index.html'), 'utf8');
      indexData = indexHtml.replace(new RegExp(`{{${name}}}`, 'g'), htmlData);
      await fsPromises.writeFile(path.join('06-build-page', 'project-dist', 'index.html'), indexData ,'utf8');
    }
  }
}