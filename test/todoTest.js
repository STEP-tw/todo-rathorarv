const assert = require('chai').assert;
let Todo = require('../lib/todo.js');

describe('Todo', () => {
  describe('#getToDoItems', () => {
    it('should return empty array', () => {
      let todo = new Todo('home','home stuff');
      let expected = todo.getToDoItems();
      assert.isEmpty(expected);
    });
  });
  describe('#getDescription', () => {
    it('should give description', () => {
      let todo = new Todo('home','home stuff');
      let expected = todo.getDescription();
      assert.equal(expected,'home stuff');
    });
  });
  describe('#getTitle', () => {
    it('should give title', () => {
      let todo = new Todo('home','home stuff');
      let expected = todo.getTitle();
      assert.equal(expected,'home');
    });
  });
  describe('#setTitle', () => {
    it('should set title', () => {
      let todo = new Todo('home','home stuff');
      todo.setTitle('anotherhome');
      let expected = todo.getTitle();
      assert.equal(expected,'anotherhome');
    });
  });
  describe('#change description', () => {
    it('should change description', () => {
      let todo = new Todo('home','home stuff');
      todo.changeDescription('new description');
      let expected = todo.getDescription();
      assert.equal(expected,'new description');
    });
  });
  describe('#getToDoItems', () => {
    it('should give todo item by index', () => {
      let todo = new Todo('home','home stuff',['first todo item']);
      let expected = todo.getToDoItems(0);
      assert.equal(expected,'first todo item');
    });
  });
  describe('#deleteTodoItem', () => {
    it('should delete todo item by index', () => {
      let todo = new Todo('home','home stuff',['first todo item']);
      todo.deleteTodoItem(0);
      let expected = todo.getToDoItems();
      assert.isEmpty(expected);
    });
  });
  describe('#addTodoItem', () => {
    it('should add todo item', () => {
      let todo = new Todo('home','home stuff',[]);
      todo.addTodoItems('first todo item');
      let expected = todo.getToDoItems(0);
      assert.equal(expected,'first todo item');
    });
  });
});
