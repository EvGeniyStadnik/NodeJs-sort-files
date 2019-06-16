const fs = require('fs');
const del = require('del');
const Watcher = require('./lib/Watcher');
const program = require('./lib/commander');
const createSortedOutput = require('./lib/createSortedOutput');

const watcher = new Watcher(() => {
  console.log('finished All!');
  if(program.delete && fs.existsSync(program.folder)){
    del(program.folder).then(() => {
      console.log(program.folder, 'deleted')
    })
  }
});

const getFolderForSort = createSortedOutput(program.output, watcher);

if(!fs.existsSync(program.folder)){
  console.log('Source folder ', program.folder, ' not exists and will create')
  fs.mkdirSync(program.folder);
} else {
  if(!fs.existsSync(program.output)){
    fs.mkdirSync(program.output)
  }
  getFolderForSort(program.folder);
  watcher.finishAll();
}
