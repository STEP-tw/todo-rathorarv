const fs = require('fs');
const timeStamp = ()=>{
  let t = new Date();
  return `${t.toDateString()} ${t.toLocaleTimeString()}`;
}

const toS = (o)=>JSON.stringify(o,null,2);

const getHeader = function (file) {
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

exports.serveFile = function (req, res) {
  let filePath = `public${req.url}`;
  if (req.method == 'GET' && fs.existsSync(filePath)) {
    res.setHeader("content-type",getHeader(filePath));
    res.write(fs.readFileSync(filePath));
    res.end();
  }
}

exports.logRequest = (req,res)=>{
  let text = ['----------------------------',
  `${timeStamp()}`,
  `${req.method} ${req.url}`,
  `HEADERS=> ${toS(req.headers)}`,
  `COOKIES=> ${toS(req.cookies)}`,
  `BODY=> ${toS(req.body)}`,
  ''
  ].join('\n');
  fs.appendFile('request.log',text,()=>{})
  console.log(`${req.method} ${req.url}`);
}
