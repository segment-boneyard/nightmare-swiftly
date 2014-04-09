
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
 * @param {String} instructions
 * @param {Array} uploads
 * @param {Function} callback
 */

exports.task = function(instructions, uploads, callback){
  return function(nightmare){
    nightmare
      .goto('https://swiftly.com/create')
      .wait(2000)
      .type('#body', instructions);

    uploads.forEach(function (path) {
      nightmare.upload('input[name=qqfile]', path);
    });

    nightmare
      .wait(5000)
      .click('#task-pay-button')
      .wait(500)
      .click('#pay-button')
      .wait()
      .evaluate(function () {
        return window.location.href;
      }, callback);
  };
};