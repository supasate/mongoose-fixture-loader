var loadFixture = function(ModelClass, data) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(data)) {
      let results = [];

      data.forEach((json) => {
        (new ModelClass(json)).save((err, inst) => {
          if (err) reject(err);

          results.push(inst);
        });

        resolve(results);
      });
    } else {
      // Load single json data
      (new ModelClass(data)).save((err, inst) => {
        if (err) reject(err);

        resolve(inst);
      });
    }
  });
};

module.exports = loadFixture;
