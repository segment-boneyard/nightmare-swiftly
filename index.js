
/**
 * Login to a Swiftly account.
 *
 * @param {String} email
 * @param {String} password
 */

var login = exports.login = function(email, password){
  return function(nightmare) {
    nightmare
      .viewport(800, 1600)
      .goto('https://swiftly.com/login')
        .type('#username', email)
        .type('#password', password)
        .click('.button--primary')
      .wait();
  };
};

/**
 * Execute an entire task on Swiftly.
 *
 * @param {String} instructions
 * @param {Array} uploads
 * @param {String} path
 */

var task = exports.task = function(instructions, uploads, path) {
  return function(nightmare) {
    nightmare
      .use(create(instructions, uploads))
      .use(onState('Delivered'))
      .use(download(path))
      .use(approve());
  };
};

/**
 * Create a new task on Swiftly.
 *
 * @param {String} instructions
 * @param {Array} uploads
 * @param {Function} callback
 */

var create = exports.create = function (instructions, uploads){
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
      .wait();
  };
};

/**
 * On task state.
 *
 * @param {String} state "Delivered", "Approved"
 */

var onState = exports.onState = function(state) {
  var between = 1000 * 60 * 10; // 10 minutes
  return function(nightmare){
    nightmare
      .wait(function () {
        var pill = document.querySelector('.pill');
        return (pill ? pill.textContent : '');
      }, state, between);
  };
};

/**
 * Download the results of a task.
 *
 * @param {String} path
 * @param {String} url
 */

var download = exports.download = function(path, url) {
  return function(nightmare){
    if (url) nightmare.goto(url);
    nightmare
      .evaluate(function () {
        var urls = document.querySelectorAll('.attachment__actions__download')
          .map(function (link) {
            return link.href;
          })
          .filter(function (url) {
            return url.indexOf('deliveries') > 0;
          });
        return urls;
      }, function (urls) {
        urls.forEach(function (file) {
          exec('wget -P ' + path + ' ' + file);
        });
      })
      .wait(3000);
  };
};

/**
 * Approve a task.
 *
 * @param {String} url
 */

var approve = exports.approve = function(url) {
  return function(nightmare){
    if (url) nightmare.goto(url);
    nightmare
      .click('.task-actions .button--primary')
      .click('.face--good')
      .click('.approve-delivery .button--primary')
      .wait();
  };
};


