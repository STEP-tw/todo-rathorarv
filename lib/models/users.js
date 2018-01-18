const User = require('./user.js');
const TodoList = require('./todolist.js');
class Users {
  constructor() {
    this.users = [];
  }
  addUser(userName){
    let todos = new TodoList();
    let user = new User(userName,todos);
    this.users.push(user);
  }
  hasUser(userName){
    return this.users.some(u=>u.name == userName);
  }
  getUser(userName){
    let user = this.users.find(u=>u.name == userName);
    return user;
  }
  getUserBySessionId(sessionid){
    let user = this.users.find(u=>u.sessionid == sessionid);
    return user;
  }
}
module.exports = Users;
