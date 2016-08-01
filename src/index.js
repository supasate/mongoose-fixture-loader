var loadFixture = function(ModelClass, data) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(data)) {
      // Load array of json objects
      const promises = [];

      data.forEach((json) => {
        promises.push((new ModelClass(json)).save());
      });

      Promise.all(promises)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      // Load single json object
      (new ModelClass(data)).save()
        .then((inst) => {
          resolve(inst);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

module.exports = loadFixture;
