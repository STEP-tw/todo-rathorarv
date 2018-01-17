class Todo {
  constructor(title,description,todoItems=[],id) {
    this.title = title;
    this.description = description;
    this.todoItems = todoItems;
    this.id = id;
  }
  getToDoItems(){
    return this.todoItems;
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
    return this.todoItems.splice(index,1);
  }
  addTodoItems(item){
    this.todoItems.push(item);
  }
}
module.exports = Todo;
