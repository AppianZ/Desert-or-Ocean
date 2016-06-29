var express = require('express');

var  router = express.Router();
var app = express();
var admin = express();
var secret = express();
/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index',
      { title: 'my app 123',
        content: 'GET request to homepage'});
});

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
  res.send('Admin Homepage');
});

secret.get('/', function (req, res) {
  console.log(secret.mountpath); // /secr*t
  res.send('Admin Secret');
});

admin.use('/secr*t', secret);
app.use(['/adm*n', '/manager'], admin);

router.param(function(param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

// using the customized router.param()
router.param('id', 1337);

// route to trigger the capture
router.get('/user/:id', function (req, res) {
  res.send('OK');
});

app.use(router);

app.listen(3000, function () {
  console.log('Ready');
});







module.exports = app;











// ----------------------------------------------------
app.disable('parameter');
console.log('1.1 ' + app.get('parameter'));//false

app.disabled('parameter');
console.log('2.1 ' + app.disabled('parameter'));//true
console.log('2.2 ' + app.get('parameter'));//false

app.enable('parameter');
console.log('3.1 ' + app.get('parameter'));//true

app.enabled('parameter');
console.log('4.1 ' + app.enabled('parameter'));//true
console.log('4.2 ' + app.get('parameter'));//true

app.set('title', 'My Express App');
console.log('5.1 ' + app.get('title'));//My Express App

// ----------------------------------------------------

