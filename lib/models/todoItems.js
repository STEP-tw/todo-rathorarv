const Item = require('./TodoItem.js');
class TodoItems {
  constructor() {
    this.items = {};
    this.id = 0;
  }
  addItem(item){
    let todoItem = new Item(item,this.id);
    this.items[this.id++] = todoItem;
  }
  changeStatus(id){
    this.items[id].changeStatus();
  }
  getStatus(){
    return this.items[key].status();
  }
  getAllItems(){
    return Object.values(this.items);
  }
  deleteTodoItem(id){
    delete this.items[id];
  }
}

module.exports = TodoItems;
