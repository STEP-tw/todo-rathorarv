const fs = require('fs');
let Title = require('./dataStructure.js');
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
  writeInConfiFile(){
    let allusers = JSON.stringify(this.allusers,null,2);
    fs.writeFileSync('./data/data.json',allusers,'utf8');
  }
  addData(){
    let data = fs.readFileSync('./data/data.json','utf8');
    data = JSON.parse(data);
    data.arvinds.forEach(function(o){
      o.__proto__ = new Title().__proto__;
    });
    this.allusers = data;
  }
  writeInPublicFile(){
    this.addData();
    let allusers = JSON.stringify(this.allusers,null,2);
    fs.writeFileSync('./public/js/data.js',`var data = ${allusers}`,'utf8');
  }
  addTodoItem(user,description,items){
    let todo = this.allusers[user].find(todo=> todo.description==description);
    todo.todoItems.push(items);
  }
  deleteTitle(user,title){
    console.log(title);
    let index = this.allusers[user].findIndex(todo=> todo.title==title);
    console.log(index);
    this.allusers[user].splice(index,1);
  }
  deleteItem(user,title,index){
    let todoIndex = this.allusers[user].findIndex(todo=> todo.title==title);
    this.allusers[user][todoIndex].deleteTodoItem(index);
  }
}

module.exports = Userhandler;
