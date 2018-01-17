const assert = require('chai').assert;

let Users = require('../lib/users.js');

describe('Users', () => {
  beforeEach(function() {
    users = new Users();
  });
  describe('#hasUser', () => {
    it('should return true for registered users', () => {
      users.addUser('arvinds');
      assert.isOk(users.hasUser('arvinds'));
    });
    it('should return false for unregistered users', () => {
      assert.isNotOk(users.hasUser('pranav'));
    });
  });
  describe('#getUser', () => {
    it('should return true for registered users', () => {
      users.addUser('arvinds');
      let expectedUsers = new Users();
      expectedUsers.addUser('arvinds');
      assert.deepEqual(expectedUsers.getUser('arvinds'),users.getUser('arvinds'));
    });
  });
});
