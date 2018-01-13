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
  let items = userData.todoItems.map(function(item) {
    return `<h4 class="todo">${item}<h4>`
  });
  return heading + items.join('') + '<br>' + fs.readFileSync('./public/addTodoItmes.html', 'utf8');
}

const serveToDoItems = function(req, res) {
  let path = req.url;
  path = path.replace('/', '');
  if (allTitle.includes(path)) {
    res.setHeader('content-type', 'text/html');
    let todo = userTodo.find(t => t.title == path);
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
  console.log(`${req.method} ${req.url}`);
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
  users.addUser('arvinds');
  res.redirect('/home.html');
}

const logoutHandler = (req, res) => {
  res.setHeader('set-cookie', [`sessionid=0; Expires=new Date(0);`,
    `logInFailed=false; Expires=new Date(0);`
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

const redirectLoggedOutUserToLogin = (req, res) => {
  if (req.urlIsOneOf(['/home.html', '/logout']) && !req.user) res.redirect('/loginPage.html');
}

const redirectLoggedInUserToHome = (req, res) => {
  if (req.urlIsOneOf(['/', '/loginPage.html']) && req.user) res.redirect('/home.html');
}

const handleTodo = function(req, res) {
  let todoDetails = req.body;
  let todo = new Title(todoDetails.title, todoDetails.description);
  users.addTitle('arvinds', todo);
  users.writeInFile();
  refreshTitle(users);
  res.write(JSON.stringify(req.body));
  res.end();
}
// =============================================

app.use(logRequest);
app.use(serveToDoItems);
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.postprocess(serveFile);
  // app.get('/', (req, res) => {
  //   res.redirect('/loginPage.html');
  // })

app.post('/login', loginHandler);

app.get('/logout', logoutHandler);

app.post('/todoHandler', handleTodo);

app.post('/addItems', (req, res) => {
  let item = req.body.item;
  let description = req.body.description;
  let userAllTodo = users.addTodoItem('arvinds',description,item);
  res.write(item);
  res.end();
});

module.exports = app;
