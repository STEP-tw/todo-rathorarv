class DefaultHandler {
  constructor() {
  }
  excecute(){
  }
  getRequestHandler(){
    return this.excecute.bind(this);
  }
}

module.exports = DefaultHandler;
