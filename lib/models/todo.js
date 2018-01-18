const TodoItems = require('./todoItems.js');
class Todo {
  constructor(title,description,id) {
    this.title = title;
    this.description = description;
    this.todoItems = new TodoItems();
    this.id = id;
  }
  getToDoItems(){
    return Object.values(this.todoItems);
  }
  getDescription(){
    return this.description;
  }
  getId(){
    return this.id;
  }
  getTitle(){
    return this.title;
  }
  setTitle(title){
    this.title = title;
  }
  changeDescription (description){
    this.description = description
  }
  changeTitle (title){
    this.title = title;
  }
  getToDoItemsByIndex (index){
    return this.todoItems[index];
  }
  deleteTodoItem(index){
    return this.todoItems.deleteTodoItem(index);
  }
  addTodoItems(item){
    this.todoItems.addItem(item);
  }
  changeStatus(itemId){
    this.todoItems.changeStatus(itemId);
  }
}
module.exports = Todo;
