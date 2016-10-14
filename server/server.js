var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('./config'),
  User = require('./app/models/user'),
  apiRoutes = express.Router();


var port = process.env.PORT || 8080;
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function (req, res, next) {
  if (req.method === 'OPTIONS') {
    var headers = {};
    headers['Access-Control-Allow-Origin'] = "*";
    headers['Access-Control-Allow-Headers'] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    headers['Access-Control-Allow-Methods'] = "GET, POST, OPTIONS";
    
    res.writeHead(200, headers);
    res.end();
  } else {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
  }
});

// Authentication
apiRoutes.post('/authenticate', function (req, res) {
  User.findOne({
    name: req.body.name
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed!' });
    } else {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Wrong password!' });
      } else {
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440
        });

        res.json({
          success: true,
          message: 'Done!',
          token: token
        });
      }
    }
  });
});

// Middleware to check token
apiRoutes.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) return res.json({success: false, message: 'Failed to authenticate!'});
      else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({ success: false, message: 'Token is required!' });  
  }
});

apiRoutes.get('/', function (req, res) {
  res.json({ message: 'Test Data' });
});

apiRoutes.get('/users/add', function (req, res) {
  var user = new User({
    name: 'Nick',
    password: 'pass1',
    admin: true
  });

  user.save(function (err) {
    if (err) throw err;

    console.log('User was saved');
    res.json({success: true});
  });
});

apiRoutes.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users);
  });
});

app.use('/api', apiRoutes);
app.listen(port);
console.log('Server has started at port: ' + port);