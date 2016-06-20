var express = require('express');
var router = express();
var admin = express();
var secret = express();
/* GET home page. */
router.get('/', function(req, res, next) {
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
router.use(['/adm*n', '/manager'], admin);
module.exports = router;


// ----------------------------------------------------
router.disable('parameter');
console.log('1.1 ' + router.get('parameter'));//false

router.disabled('parameter');
console.log('2.1 ' + router.disabled('parameter'));//true
console.log('2.2 ' + router.get('parameter'));//false

router.enable('parameter');
console.log('3.1 ' + router.get('parameter'));//true

router.enabled('parameter');
console.log('4.1 ' + router.enabled('parameter'));//true
console.log('4.2 ' + router.get('parameter'));//true

router.set('title', 'My Express App');
console.log('5.1 ' + router.get('title'));//My Express App

// ----------------------------------------------------

