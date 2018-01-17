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
  deleteTodo(key){
    this.todos.deleteTodo(key);
  }
  editTodo(key,newTitle){
    this.todos.editTodo(key,newTitle);
  }
  getAllTodoKeys(){
    return Object.keys(this.todos.allTodo);
  }
  getTodo(key){
    return this.todos.allTodo[key];
  }
}

module.exports = User;
