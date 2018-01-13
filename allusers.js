const fs = require('fs');
class Userhandler {
  constructor() {
    this.allusers = {};
  }
  addUser(userName){
    this.allusers[userName] = [];
  }
  addTitle(user,title){
    this.allusers[user].push(title);
  }
  writeInFile(){
    let allusers = JSON.stringify(this.allusers,null,2);
    fs.writeFileSync('./public/data/data.json',allusers,'utf8');
    fs.writeFileSync('./public/js/data.js',`var data = ${allusers}`,'utf8');
  }
  addData(){
    let data = fs.readFileSync('./public/data/data.json','utf8');
    data = JSON.parse(data);
    this.allusers = data;
  }
  addTodoItem(user,description,items){
    let todo = this.allusers[user].find(todo=> todo.description==description);
    todo.todoItems.push(items);
  }
}

module.exports = Userhandler;
