const fs = require('fs');
let webapp = require('./webapp.js');
let app = webapp.create();
let Title = require('./dataStructure.js');
let Allusers = require('./allusers.js');
let users = new Allusers();
users.addData();
let userTodo = users.allusers.arvinds;
let allTitle = userTodo.map((todo) => todo.title);
let allurl = allTitle.map((string) => encodeURI(string));

//=================================

let registeredUsers = [{
  userName: 'arvinds',
  password: "arvind singh"
}];

const refreshTitle = function(allusers) {
  userTodo = users['allusers']['arvinds'];
  allTitle = userTodo.map((todo) => todo.title);
  allurl = allTitle.map((string) => encodeURI(string));
}

refreshTitle(userTodo);

const timeStamp = () => {
  let t = new Date();
  return `${t.toDateString()} ${t.toLocaleTimeString()}`;
}

const toS = (o) => JSON.stringify(o, null, 2);

const getHeader = function(file) {
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

const serveFile = function(req, res) {
  if(req.url=='/') req.url = '/loginPage.html';
  let filePath = `public${req.url}`;
  if (req.method == 'GET' && fs.existsSync(filePath)) {
    res.setHeader("content-type", getHeader(filePath));
    res.write(fs.readFileSync(filePath));
    res.end();
  }
}

const getItemsAsHtml = function(userData) {
  let heading = fs.readFileSync('./public/templates/addTodoItems.html','utf8');
  let items = userData.todoItems.map(function(item,index) {
    return `<p>${item}<button id=${index} onclick=deleteItem()>delete</button></p>`
  });
  return heading + items.join('') + fs.readFileSync('./public/addTodoItmes.html', 'utf8');
}

const serveToDoItems = function(req, res) {
  let path = req.url;
  path = path.replace('/', '');
  if (allTitle.includes(path)) {
    res.setHeader('content-type', 'text/html');
    users.addData();
    let allTodo = users.allusers.arvinds;
    let todo = allTodo.find(t => t.title == path);
    let content = getItemsAsHtml(todo);
    content = content.replace('details',todo.description);
    res.write(content);
    res.end();
  }
}

const logRequest = (req, res) => {
  let text = ['----------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,
    ''
  ].join('\n');
  fs.appendFile('request.log', text, () => {})
  // console.log(`${req.method} ${req.url}`);
}
const loginHandler = (req, res) => {
  let user = registeredUsers.find(u => u.userName == req.body.userName);
  if (!user) {
    res.setHeader('Set-Cookie', `logInFailed=true; Max-Age=5`);
    res.redirect('/loginPage.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home.html');
}

const logoutHandler = (req, res) => {
  res.setHeader('set-cookie', [`sessionid=0; Max-Age=-1;`,
    `logInFailed=false; Max-Age=-1;`
  ]);
  res.redirect('/loginPage.html');
}

const loadUser = (req, res) => {
  let sessionid = req.cookies.sessionid;
  let user = registeredUsers.find(u => u.sessionid == sessionid);
  if (sessionid && user) {
    req.user = user;
  }
};

const haslogin = function(req,res) {
  refreshTitle(userTodo);
  let path = req.url.replace('/','');
  if(allurl.includes(path)&& !req.user)
  res.redirect('loginPage.html');
}

const redirectLoggedOutUserToLogin = (req, res) => {
  if (req.urlIsOneOf(['/home.html', '/logout']) && !req.user) res.redirect('/loginPage.html');
}

const redirectLoggedInUserToHome = (req, res) => {
  if (req.urlIsOneOf(['/', '/loginPage.html']) && req.user) res.redirect('/home.html');
}

const handleTodo = function(req, res) {
  users.writeInPublicFile();
  let todoDetails = req.body;
  let todo = new Title(todoDetails.title, todoDetails.description);
  users.addTitle('arvinds', todo);
  users.writeInConfiFile();
  refreshTitle(users);
  res.write(JSON.stringify(req.body));
  res.end();
}

const itemhandler = (req, res) => {
  let item = req.body.item;
  let description = req.body.description;
  let userAllTodo = users.addTodoItem(req.user.userName,description,item);
  users.writeInConfiFile();
  users.writeInPublicFile();
  res.write(item);
  res.end();
}

const deleteTitle = function(req,res){
  users.deleteTitle(req.user.userName,req.body.title);
  users.writeInConfiFile();
  users.writeInPublicFile();
  res.end();
}
const deleteItem = function(req,res){
  users.deleteItem(req.user.userName,req.body.title,req.body.index);
  users.writeInConfiFile();
  users.writeInPublicFile();
  res.end();
}
// =============================================
app.use(logRequest);
app.use(loadUser);
app.use(serveToDoItems);
app.use(haslogin);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.postprocess(serveFile);
app.post('/login', loginHandler);
app.post('/deleteTitle',deleteTitle);
app.post('/deleteItem',deleteItem);
app.get('/logout', logoutHandler);
app.post('/todoHandler', handleTodo);
app.post('/addItems', itemhandler);
module.exports = app;
