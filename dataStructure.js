class UserTodo {
  constructor(title,description,todoItems=[]) {
    this.title = title;
    this.description = description;
    this.todoItems = todoItems;
  }
  getToDoItems(){
    return this.todoItems;
  }
  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.description;
  }
  changeTitle(title){
    this.title = title;
  }
  changeDescription (description){
    this.description = description;
  }
  getToDoItemsByIndex (index){
    return this.todoItems[index];
  }
  deleteTodoItem(index){
    return this.todoItems.splice(index,1);
  }
  addTodoItems(item){
    this.todoItems.push(item);
  }
}
module.exports = UserTodo;
