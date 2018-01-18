class TodoItem {
  constructor(item, id) {
    this._item = item;
    this._status = 'undone';
    this.id = id;
  }
  get item() {
    return this._item;
  }
  get status() {
    return this._status;
  }
  changeStatus() {
    if (this._status == 'undone') {
      this._status = 'done';
    } else {
      this._status = 'undone';
    }
  }
}

module.exports = TodoItem;
