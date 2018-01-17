const Todo = require('./todo.js');
class TodoList {
  constructor() {
    this.allTodo = {};
    this.id = 0;
  }
  addTodo(title, description, todoItems = []) {
    let todo = new Todo(title, description, todoItems,this.id);
    this.allTodo[this.id++] = todo;
  }
  getToDoItems(key){
    return this.allTodo[key].getToDoItems();
  }
  getTitle(key){
    return this.allTodo[key].getTitle();
  }
  getDescription(key){
    return this.allTodo[key].getDescription();
  }
  changeDescription(key,newDescription){
    this.allTodo[key].changeDescription(newDescription);
  }
  changeTitle(key,newTitle){
    this.allTodo[key].changeTitle(newTitle);
  }
  getAllTodo(){
    return Object.values(this.allTodo);
  }
  deleteTodo(key){
    delete this.allTodo[key];
  }
}

module.exports = TodoList;
