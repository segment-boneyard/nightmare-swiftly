
var exec = require('child_process').exec;
var request = require('superagent');
var fs = require('fs');

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
      .wait()
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
      .wait()
      .wait();
  };
};

/**
 * Get task state.
 *
 * @param {String} state "Delivered", "Approved"
 */

var onState = exports.state = function(fn) {
  return function(nightmare){
    nightmare
      .evaluate(function () {
        var pill = document.querySelector('.pill');
        return pill ? pill.textContent.toLowerCase() : 'pending';
      }, fn);
  };
};

/**
 * On task state.
 *
 * @param {String} state "Delivered", "Approved"
 */

var onState = exports.onState = function(state) {
  var between = 5000//1000 * 60 * 10; // 10 minutes
  return function(nightmare){
    nightmare
      .wait(function () {
        var pill = document.querySelector('.pill');
        return pill ? pill.textContent.toLowerCase() : 'pending';
      }, state.toLowerCase(), between);
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
        var deliveries = document.querySelectorAll('.delivery');
        var delivery = deliveries[deliveries.length - 1];
        var links = delivery.querySelectorAll('.attachment__actions__download');
        var files = [].slice.call(links).map(function(link){
          return {
            name: link.getAttribute('download'),
            url: link.getAttribute('href')
          };
        });
        return files;
      }, function(files){
        files.forEach(function(file){
          var stream = fs.createWriteStream(path + '/' + file.name);
          request.get(file.url).pipe(stream);
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


