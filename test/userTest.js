const assert = require('chai').assert;
let User = require('../lib/user.js');
const TodoList = require('../lib/todolist.js');

describe('User', () => {
  describe('#getName', () => {
    it('should return name', () => {
      let user = new User('arvind', []);
      let name = user.getName();
      assert.equal(name, 'arvind');
    });
  });
  describe('#createTodo', () => {
    it('should add todo in todo list', () => {
      let todoList = new TodoList();
      todoList.addTodo('office', 'office stuff');
      let user = new User('arvind', todoList);
      user.addTodo('home', 'home stuff');
      let todos = user.getTodos().allTodo;
      assert.deepEqual(todos, {
        '0': {
          title: 'office',
          description: 'office stuff',
          id :0,
          todoItems: []
        },
        '1': {
          title: 'home',
          description: 'home stuff',
          id :1,
          todoItems: []
        }
      });
    });
  });
  describe('#getToDoItems', () => {
    it('should add todo in todo list', () => {
      let todoList = new TodoList();
      todoList.addTodo('office', 'office stuff');
      let user = new User('arvind', todoList);
      user.addTodo('home', 'home stuff', ['clean room']);
        let todoItemList = user.getToDoItems(1);
      assert.deepEqual(todoItemList, ['clean room']);
    });
  });
});
