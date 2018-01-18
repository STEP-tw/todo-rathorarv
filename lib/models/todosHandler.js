class TodoRequestHandler {
  constructor(validTodoIDs,fs) {
    this.validTodoIDs = validTodoIDs;
    this.fs = fs;
  }
  hasTodo(id){
    return this.validTodoIDs.includes(id);
  }
  viewTodo(todo){
    return `<div><h1 class=login>Title:${todo.title}</h1><br><h2>Description:${todo.description}</h2></div>`;
  }
  getAddTodoItems(){
    return this.fs.readFileSync('./public/addTodoItmes.html','utf8');
  }
}

module.exports = TodoRequestHandler;
