class userTodo {
  constructor(description) {
    this.description = description;
    this.todoItems = [];
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
}
module.exports = userTodo;
