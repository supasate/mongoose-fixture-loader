const expect = require('chai').expect;
const mongoose = require('mongoose');
const loadFixture = require('mongoose-fixture-loader');
const UserModel = require('../src/models/user-model.js');
const user = require('./fixtures/user.js');

// Mongoose default promise is deprecated
mongoose.Promise = global.Promise;

describe('a test suite', () => {
  mongoose.connect('mongodb://localhost/mongoose-fixture-loader-test');

  before((done) => {
    loadFixture(UserModel, user)
      .then((userInst) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  after((done) => {
    UserModel.remove({})
      .then(() => {
        return mongoose.connection.close();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should find John', (done) => {
    UserModel.find({})
      .then((users) => {
        expect(users[0].firstName).to.equal('John');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
