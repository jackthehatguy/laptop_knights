const express = require('express');
var app = express();

const PORT = 8012;

app.get('/old', function(req, res, next) {
  const fileName = 'index.html';
  options = {
    root: `${__dirname}/old/`,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  res.sendFile(fileName, options, err => {
    if (err) {
      console.log(err);
      next();
    } else {
      console.log(`Sent: ${fileName}`);
    }
  });
});

app.get('/demo', (req, res, next) => {
  const fileName = 'demo.js';
  options = {
    root: `${__dirname}/old/`,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  res.sendFile(fileName, options, err => {
    if (err) {
      console.log(err);
      next();
    } else {
      console.log(`Sent: ${fileName}`);
    }
  });
});


app.get('/ttkC', (req, res, next) => {
  const fileName = 'TabletopKnightsCover.jpg';
  options = {
    root: `${__dirname}/old/img/`,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  res.sendFile(fileName, options, err => {
    if (err) {
      console.log(err);
      next();
    } else {
      console.log(`Sent: ${fileName}`);
    }
  });
});

app.get('/old/pierre/:action/:direction', (req, res, next) => {
  const fileName = `pierre_${req.params.action}_${req.params.direction}.png`;
  options = {
    root: `${__dirname}/old/img/pierre/`,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  res.sendFile(fileName, options, err => {
    if (err) {
      console.log(err);
      next();
    } else {
      console.log(`Sent: ${fileName}`);
    }
  });
});

app.listen(PORT);

console.log(`Server running on http://localhost:${PORT}`);
