class User {
  constructor(name,todos) {
    this.name = name;
    this.todos = todos;
  }
  addTodo(title,description,todoItems=[]){
    this.todos.addTodo(title,description,todoItems);
  }
  getTodos(){
    return this.todos;
  }
  getName(){
    return this.name;
  }
  getToDoItems(key){
    return this.todos.getToDoItems(key);
  }
  getAllTodo(){
    return this.todos.getAllTodo();
  }
  addSessionId(sessionid){
    this.sessionid = sessionid;
  }
}

module.exports = User;
