class todoHandler {
  constructor() {
    this.titles = {};
  }
  addTodo(title,details){
    this.titles[title] = details;
  }
  changeTitle(oldTitle,newTitle){
    let details = this.titles[oldTitle];
    this.titles[newTitle] = details;
  }
  changeDescription(title,newDescription){
    let details = this.titles[title];
    details.changeDescription(newDescription);
  }
}
module.exports = todoHandler;
