
const assert = require('chai').assert;
const TodoItem = require('../lib/todoItem.js');

describe('Todo', () => {
  describe('#get text', () => {
    it('should return todo item text', () => {
      let todo = new TodoItem('do the homework');
      let expected = todo.text;
      assert.equal(expected,'do the homework');
      assert.equal(todo.status,false);
    });
  });
  describe('#markAsDone', () => {
    it('should change the status to true', () => {
      let todo = new TodoItem('do the homework');
      todo.markAsDone();
      let expected = todo.status
      assert.equal(expected,true);
    });
  });
  describe('#markAsUndone', () => {
    it('should change the status to false', () => {
      let todo = new TodoItem('do the homework');
      todo.markAsDone();
      todo.markAsUndone();
      let expected = todo.status
      assert.equal(expected,false);
    });
  });
});
