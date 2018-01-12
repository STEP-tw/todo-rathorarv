let webapp = require('./webapp.js');
let app = webapp.create();
let Title = require('./dataStructure.js');
let Todo = require('./todoHandler.js');
let Allusers = require('./allusers.js');
let allusers = new Allusers();
allusers.addData();

//=================================

let registeredUsers = [{userName:'arvinds',password:"arvind singh"}];

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

const serveFile = function (req, res) {
  let filePath = `public${req.url}`;
  if (req.method == 'GET' && fs.existsSync(filePath)) {
    res.setHeader("content-type",getHeader(filePath));
    res.write(fs.readFileSync(filePath));
    res.end();
  }
}

const logRequest = (req,res)=>{
  let text = ['----------------------------',
  `${timeStamp()}`,
  `${req.method} ${req.url}`,
  `HEADERS=> ${toS(req.headers)}`,
  `COOKIES=> ${toS(req.cookies)}`,
  `BODY=> ${toS(req.body)}`,
  ''
  ].join('\n');
  fs.appendFile('request.log',text,()=>{})
  // console.log(`${req.method} ${req.url}`);
}
const loginHandler = (req,res)=>{
  let user = registeredUsers.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true; Max-Age=5`);
    res.redirect('/loginPage.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home.html');
}

const logoutHandler = (req,res)=>{
  res.setHeader('set-cookie',[`sessionid=0; Expires=new Date(0);`,
  `logInFailed=false; Expires=new Date(0);`]);
  res.redirect('/loginPage.html');
}

const loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registeredUsers.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

// =============================================

app.use(logRequest);
app.use(loadUser);
// app.use(redirectLoggedInUserToHome);
// app.use(redirectLoggedOutUserToLogin);
app.postprocess(serveFile);
app.get('/',(req,res)=>{
  res.redirect('/loginPage.html');
})

app.post('/login',loginHandler);

app.get('/logout',logoutHandler);

let todo = new Todo();
allusers.addUser('arvinds',todo);
app.post('/todoHandler',(req,res)=>{
  let titleAndDescription = req.body;
  let descriptionAndItems = new Title(titleAndDescription.description);
  allusers.addUserTodo('arvinds',titleAndDescription.title,descriptionAndItems);
  allusers.writeInFile();
  res.write(JSON.stringify(req.body));
  res.end();
});



module.exports = app;
