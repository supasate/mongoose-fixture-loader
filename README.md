# Mongoose Fixture Loader

A promise fixture loader for Mongoose.

1) Load a single object

``` javascript
loadFixture(UserModel, userObject);
```

2) Load an array of objects
``` javascript
loadFixture(UserModel, arrayOfUserObjects);
```

3) Load a sequence of objects

``` javascript
loadFixture(UserModel, userObject)
  .then((userInstance) => {
    loadFixture(BookModel, bookObjectRelatedToUserObject)
  });
```

4) Load objects in parallel
``` javascript
Promise.all([
  loadFixture(UserModel, userObject),
  loadFixture(CatModel, catObject),
  loadFixture(DogModel, dogObject)
]);
```

## Installation

`npm install --save mongoose-fixture-loader`

## Usage

1. Assume you have a user model file `src/models/user-model.js` as the following.

``` javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: {type: String, required: true },
  email: { type: String },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
```

2. Create a fixture file `test/fixtures/user.js` to export a JSON object,

``` javascript
module.exports = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@test.com'
};
```

or an array of JSON object.

``` javascript
module.exports = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@test.com'
  },
  {
    firstName: 'Alice',
    lastName: 'Bob',
    email: 'alice.bob@test.com'
  }
];
```

3. In your test file `test/index-test.js`, load the fixture into MongoDB.

``` javascript
const loadFixture = require('mongoose-fixture-loader');
const UserModel = require('../src/models/user-model.js');
const user = require('./fixtures/user.js');

describe('a test suite', () => {
  before((done) => {
    loadFixture(UserModel, user)
      .then((userInst) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
```
4. Enjoy testing!

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## License

Copyright (c) 2016 Supasate Choochaisri

Licensed under the [Apache License](https://github.com/supasate/Interest-Rate-Parity-JS/blob/master/LICENSE).
