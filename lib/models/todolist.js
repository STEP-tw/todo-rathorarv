const Todo = require('./todo.js');
class TodoList {
  constructor() {
    this.allTodo = {};
    this.id = 0;
  }
  addTodo(title, description) {
    let todo = new Todo(title, description,this.id);
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
  editTodo(key,newTitle){
    this.allTodo[key].changeTitle(newTitle);
  }
  addTodoItem(key,item){
    this.allTodo[key].addTodoItems(item);
  }
  changeStatus(todoId,itemId){
    this.allTodo[todoId].changeStatus(itemId);
  }
  deleteTodoItem(todoId,itemId){
    this.allTodo[todoId].deleteTodoItem(itemId);
  }
}

module.exports = TodoList;
