const expect = require('chai').expect;
const mongoose = require('mongoose');
const loadFixture = require('../src');
const UserModel = require('./models/user');

// Default Mongoose Promise is deprecated
mongoose.Promise = global.Promise;

describe('mongoose fixture loader', () => {
  const connection = mongoose.connect('mongodb://localhost/mongoose-fixture-loader-test').connection;

  before((done) => {
    connection.on('open', () => {
      connection.db.dropDatabase(() => {
        done();
      });
    });
  });

  after((done) => {
    connection.close(() => {
      done();
    });
  });

  afterEach((done) => {
    connection.db.dropDatabase(() => {
      done();
    });
  })

  it('loads a json object into MongoDB', (done) => {
    const user = require('./fixtures/user');

    loadFixture(UserModel, user)
      .then((userInst) => {
        expect(userInst.firstName).to.equal('John');
        expect(userInst.lastName).to.equal('Doe');
        expect(userInst.email).to.equal('john.doe@test.com');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('loads an array of json objects into MongoDB', (done) => {
    const users = require('./fixtures/users_array');

    loadFixture(UserModel, users)
      .then((usersList) => {
        expect(usersList.length).to.equal(users.length);

        expect(usersList[0].firstName).to.equal('John');
        expect(usersList[0].lastName).to.equal('Doe');
        expect(usersList[0].email).to.equal('john.doe@test.com');

        expect(usersList[1].firstName).to.equal('Alice');
        expect(usersList[1].lastName).to.equal('Bob');
        expect(usersList[1].email).to.equal('alice.bob@test.com');

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
