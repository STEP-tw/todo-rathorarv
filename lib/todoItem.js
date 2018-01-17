class TodoItem {
  constructor(text) {
    this._text = text;
    this._status = false;
  }
  get text(){
    return this._text;
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
