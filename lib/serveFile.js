const fs = require('fs');
const DefaultHandler = require('./Default_handler');
class ServeFile extends DefaultHandler {
  constructor(root) {
    super();
    this.root = root;
  }
  getFilePath(path){
    return `./${this.root}${path}`
  }
  getHeader(file) {
    let fileType = file.split('.')[1];
    let headers = {
      'css': 'text/css',
      'html': 'text/html',
      'js': 'text/javascript',
      'png': 'image/png',
      'gif': 'image/gif',
      'jpg': 'image/jpg',
      'pdf': 'application/pdf'
    }
    return headers[fileType];
  };

  excecute(req,res){
    if(req.url=='/') req.url = '/login';
    let path = this.getFilePath(req.url);
    if(fs.existsSync(path)){
      let contentType = this.getHeader(path)||'text/html';
      res.setHeader('content-type',contentType);
      let fileContent = fs.readFileSync(path);
      res.write(fileContent);
      res.end();
    }
  }
}
module.exports = ServeFile;
