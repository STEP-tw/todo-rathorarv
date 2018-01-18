const DefaultHandler = require('./Default_handler');
const getHeader = require('../utility.js').getHeader;

class ServeFile extends DefaultHandler {
  constructor(root,fs) {
    super();
    this.root = root;
    this.fs = fs;
  }
  getFilePath(path){
    return `./${this.root}${path}`;
  }
  excecute(req,res){
    if(req.url=='/') req.url = '/login';
    let path = this.getFilePath(req.url);
    if(this.fs.existsSync(path)){
      let contentType = getHeader(path)||'text/html';
      res.statusCode = 200;
      res.setHeader('content-type',contentType);
      let fileContent = this.fs.readFileSync(path);
      res.write(fileContent);
      res.end();
    }
  }
}
module.exports = ServeFile;
