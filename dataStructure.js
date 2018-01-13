class UserTodo {
  constructor(title,description,todoItems=[]) {
    this.title = title;
    this.description = description;
    this.todoItems = todoItems;
  }
  getToDoItems(){
    return this.todoItems
  }
  getDescription(){
    return this.description
  }
  changeDescription (description){
    this.description = description
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
