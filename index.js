
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

/**
 * On task state.
 *
 * @param {String} url
 * @param {String} state "Delivered", "Approved"
 * @param {Function} callback
 */

exports.onState = function(url, state, callback) {
  var spacing = 1000 * 60 * 10; // 10 minutes
  return function(nightmare){
    var interval = setInterval(function () {
      nightmare
        .goto(url)
        .evaluate(function () {
          var pill = document.querySelector('.pill');
          return (pill ? pill.textContent : '');
        }, function (status) {
          if (status === 'Delivered') {
            cancelInterval(interval);
            callback();
          }
        });
    }, spacing);
  };
};

/**
 * Download the results of a task.
 *
 * @param {String} url
 * @param {String} path
 */

exports.download = function(url, path) {
  return function(nightmare){
    nightmare
      .run(function () {
        var urls = document.querySelectorAll('.attachment__actions__download')
          .map(function (link) {
            return link.href;
          })
          .filter(function (url) {
            return url.indexOf('deliveries') > 0;
          });
        return urls;
      }, function (urls) {
        done();
      })
      .wait(1000);
  };
};

/**
 * Approve a task.
 *
 * @param {String} url
 */

exports.approve = function(url) {
  return function(nightmare){
    nightmare
      .click('.task-actions .button--primary')
      .click('.face--good')
      .click('.approve-delivery .button--primary')
      .wait();
  };
};