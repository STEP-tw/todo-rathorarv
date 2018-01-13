let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', done => {
      request(app, {
        method: 'GET',
        url: '/bad'
      }, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      })
    })
  })
  describe('GET /', () => {
    it('serves the loginPage.html', done => {
      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        th.status_is_ok(res);
        th.body_contains(res, 'userName');
        th.body_does_not_contain(res, 'login failed');
        done();
      });
    });
  });
  describe('GET /loginPage.html', () => {
    it('serves the login page', done => {
      request(app, {
        method: 'GET',
        url: '/loginPage.html'
      }, res => {
        th.status_is_ok(res);
        th.body_contains(res, 'userName');
        th.body_does_not_contain(res, 'login failed');
        done();
      })
    })
  })
  describe('POST /login', () => {
    it('redirects to home for valid user', done => {
      request(app, {
        method: 'POST',
        url: '/login',
        body: 'userName=arvinds'
      }, res => {
        th.should_be_redirected_to(res, '/home.html');
        th.should_not_have_cookie(res, 'message');
        done();
      })
    })
    it('redirects to loginPage.html with message for invalid user', done => {
      request(app, {
        method: 'POST',
        url: '/login',
        body: 'username=badUser'
      }, res => {
        th.should_be_redirected_to(res, '/loginPage.html');
        th.should_have_expiring_cookie(res, 'logInFailed', 'true');
        done();
      })
    })
    it('redirects to loginPage.html on logout', done => {
      request(app, {
        method: "GET",
        url: '/logout'
      }, res => {
        th.should_be_redirected_to(res, '/loginPage.html');
        th.should_not_have_cookie(res, 'sessionid');
        done();
      })
    })
  });
});
