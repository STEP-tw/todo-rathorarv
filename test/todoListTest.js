const assert = require('chai').assert;
let TodoList = require('../lib/todoList.js');

describe('TodoList', () => {
  describe('#getAllTodo', () => {
    it('should all todo of todo list', () => {
      let todoList = new TodoList();
      let allTodo = todoList.getAllTodo();
      assert.deepEqual(allTodo,[]);
    });
  });
  describe('#getTitle', () => {
    it('should give title of todo', () => {
      let todoList = new TodoList();
      todoList.addTodo('home','home stuff');
      todoList.addTodo('office','office stuff');
      let title1 = todoList.getTitle(0);
      let title2 = todoList.getTitle(1);
      assert.deepEqual(title1,'home');
      assert.deepEqual(title2,'office');
    });
  });
  describe('#getDescription', () => {
    it('should give description of todo', () => {
      let todoList = new TodoList();
      todoList.addTodo('home','home stuff');
      todoList.addTodo('office','office stuff');
      let description1 = todoList.getDescription(0);
      let description2 = todoList.getDescription(1);
      assert.deepEqual(description1,'home stuff');
      assert.deepEqual(description2,'office stuff');
    });
  });
  describe('#changeTitle', () => {
    it('should changeTitle of todo', () => {
      let todoList = new TodoList();
      todoList.addTodo('home','home stuff');
      todoList.changeTitle(0,'office')
      let title = todoList.getTitle(0);
      assert.deepEqual(title,'office');
    });
  });
  describe('#changeDesciption', () => {
    it('should change Desciption of todo', () => {
      let todoList = new TodoList();
      todoList.addTodo('home','home stuff');
      todoList.changeDescription(0,'office stuff')
      let description = todoList.getDescription(0);
      assert.deepEqual(description,'office stuff');
    });
  });
  describe('#addTodo', () => {
    it('should add todo in todo list', () => {
      let todoList = new TodoList();
      todoList.addTodo('home','home stuff');
      let allTodo = todoList.getAllTodo();
      assert.deepEqual(allTodo,[{
        title: 'home',
        id : 0,
        description: 'home stuff',
        todoItems: []
      }]);
    });
  });
  describe('#getTodoItem', () => {
    it('should give empty list of todo items', () => {
      let todoList = new TodoList();
      todoList.addTodo('home','home stuff');
      let allTodo = todoList.getToDoItems(0);
      assert.deepEqual(allTodo,[]);
    });
    it('should give all todo Item of todo', () => {
      let todoList = new TodoList();
      todoList.addTodo('home','home stuff',['clean home']);
      let allTodo = todoList.getToDoItems(0);
      assert.deepEqual(allTodo,['clean home']);
    });
  });
});
