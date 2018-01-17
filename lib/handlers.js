const fs = require('fs');
const Users = require('./users.js');
const users = new Users();
users.addUser('arvinds');

const loadUser = function(req,res){
  let sessionid = req.cookies.sessionid;
  let user = users.getUserBySessionId(sessionid);
  req.user = user;
}

const loginHandler = function(req,res) {
  let userDetails = req.body;
  if(users.hasUser(userDetails.userName)){
    let user = users.getUser(userDetails.userName);
    if(user){
      let sessionid = new Date().getTime();
      user.addSessionId(sessionid);
      res.setHeader('set-cookie',`sessionid=${sessionid}`);
      res.redirect('home');
    }
  };
}

const logoutHandle = function(req,res) {
  res.setHeader('set-cookie',`sessionid=0 ; Max-Age=0`);
  res.redirect('login');
}

const addTodoHandler = function(req,res){
  let title = req.body.title;
  let description = req.body.description;
  req.user.addTodo(title,description);
  res.end();
}

const getAllTitle = function(req,res){
  let allTodo = req.user.getAllTodo();
  allTodo = JSON.stringify(allTodo);
  res.write(allTodo);
  res.end();
}

const redirectLoggedOutUserToLogin = (req, res) => {
    if (req.urlIsOneOf(['/home', '/logout']) && !req.cookies.sessionid) res.redirect('/login');
}

const redirectLoggedInUserToHome = (req, res) => {
  if (req.urlIsOneOf(['/', '/login']) && req.cookies.sessionid)
  res.redirect('/home');
}
exports.loadUser = loadUser;
exports.redirectLoggedOutUserToLogin = redirectLoggedOutUserToLogin;
exports.redirectLoggedInUserToHome = redirectLoggedInUserToHome;
exports.loginHandler = loginHandler;
exports.logoutHandle = logoutHandle;
exports.addTodoHandler = addTodoHandler;
exports.getAllTitle = getAllTitle;
