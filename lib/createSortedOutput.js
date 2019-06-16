const fs = require('fs');
const path = require('path');

module.exports = (dist, watcher) => {
  const createOutput = (file) => {
    const firstLetter = file.name.charAt(0).toLowerCase();
    const distDir = path.join(dist, firstLetter);
    if(!fs.existsSync(distDir)){
      fs.mkdirSync(distDir)
    }
    fs.copyFile(file.dir, path.join(distDir, file.name), (err) => {
      if(err){
        throw Error(err)
      }
      watcher.stop(file.name)
    })
    // fs.copyFileSync(file.dir, path.join(distDir, file.name))
    // watcher.stop(file.name)

  };

  return function getFolderForSort(folder){
    fs.readdir(folder, (err, files) => {
      if(err){
        throw Error(err)
      }
      files.forEach((file) => {
        const fileDir = path.join(folder, file);
        const stateFile = fs.statSync(fileDir);
        if(stateFile.isDirectory()){
          getFolderForSort(fileDir);
        } else {
          watcher.start(file);
          createOutput({name: file, dir: fileDir});
        }
      })
    })
  }
};
