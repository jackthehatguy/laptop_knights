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

app.get('/old/demo', (req, res, next) => {
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

app.get('/progress', (req, res) => {
  const file = 'index.html',
    options = {
      root: `${__dirname}/progress/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file, options, err => {
    if (err) {
      console.log(err);
      // next();
    } else {
      console.log(`Sent: ${file}`);
    }
  });
});

app.get('/assets/:file', (req, res) => {
  const {file} = req.params,
    options = {
      root: `${__dirname}/progress/assets/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file, options, err => {
    if (err) {
      console.log(err);
      // next();
    } else {
      console.log(`Sent: ${file}`);
    }
  });
});

app.get('/assets/:type/:file', (req, res) => {
  const {type, file} = req.params,
    options = {
      root: `${__dirname}/progress/assets/${type}/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file, options, err => {
    if (err) {
      console.log(err);
      // next();
    } else {
      console.log(`Sent: ${file}`);
    }
  });
});

app.get('/src/:sector/:file', (req, res) => {
  const {sector, file} = req.params,
    options = {
      root: `${__dirname}/progress/src/${sector}/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file, options, err => {
    if (err) {
      console.log(err);
      // next();
    } else {
      console.log(`Sent: ${file}`);
    }
  });
});

app.get('/src/:sector/:folder/:file', (req, res) => {
  const {sector, folder, file} = req.params,
    options = {
      root: `${__dirname}/progress/src/${sector}/${folder}/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file, options, err => {
    if (err) {
      console.log(err);
      // next();
    } else {
      console.log(`Sent: ${file}`);
    }
  });
});

app.get('/src/:sector/:folder/:subfolder/:file', (req, res) => {
  const {sector, subfolder, folder, file} = req.params,
    options = {
      root: `${__dirname}/progress/src/${sector}/${folder}/${subfolder}/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file, options, err => {
    if (err) {
      console.log(err);
      // next();
    } else {
      console.log(`Sent: ${file}`);
    }
  });
});

app.listen(PORT);

console.log(`Server running on http://localhost:${PORT}`);
