class TodoItem {
  constructor(item) {
    this._item = item;
    this._status = false;
  }
  get item(){
    return this._item;
  }
  get status(){
    return this._status;
  }
  markAsDone(){
    this._status = true;
  }
  markAsUndone(){
    this._status = false;
  }
}

module.exports = TodoItem;
