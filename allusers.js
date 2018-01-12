const fs = require('fs');
class userhandler {
  constructor() {
    this.allusers = {};
  }
  addUser(userName,allTodo){
    this.allusers[userName] = allTodo;
  }
  writeInFile(){
    let allusers = JSON.stringify(this.allusers);
    fs.writeFileSync('./public/data/data.json',allusers,'utf8');
    fs.writeFileSync('./public/js/data.js',`var data = ${allusers}`,'utf8');
  }
  addData(){
    let data = fs.readFileSync('./public/data/data.json','utf8');
    data = JSON.parse(data);
    this.allusers = data
  }
  addUserTodo(user,title,details){
    this.allusers[user].addTodo(title,details);
  }
}

module.exports = userhandler;
