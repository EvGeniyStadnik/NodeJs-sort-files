class Watcher {
  constructor(cb){
    this.cb = cb;
    this.process = [];
    this.finished = false;
  }

  finishAll(){
    this.finished = true;
  }

  start(fileName) {
    this.process.push(fileName)
  };

  stop(fileName) {
    const index = this.process.findIndex(item => {
      return item === fileName
    });
    this.process.splice(index, 1);
    this._checkFinishAll()
  }

  _checkFinishAll(){
    if(this.finished && !this.process.length){
      this.cb();
    }
  }

}

module.exports = Watcher;
