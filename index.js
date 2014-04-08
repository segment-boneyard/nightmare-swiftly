
/**
 * Login to a Swiftly account.
 *
 * @param {String} email
 * @param {String} password
 */

exports.login = function(email, password){
  return function(nightmare) {
    nightmare
      .goto('https://swiftly.com/login')
        .type('#username', email)
        .type('#password', password)
        .click('.button--primary')
      .wait();
  };
};

/**
 * Create a new task on Swiftly.
 *
 * @param {String} description
 * @param {Array} uploads
 */

exports.task = function(description, uploads){
  return function(nightmare){
    nightmare
      .goto('https://swiftly.com/create')
      .wait(2000)
      .type('#body', description);

    uploads.forEach(function (path) {
      nightmare.upload('input[name=qqfile]', path);
    });

    nightmare
      .wait(5000)
      .click('#task-pay-button')
      .wait(500)
      .click('#pay-button')
      .wait();
  };
};