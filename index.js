const express = require('express');
var app = express();

const PORT = 8012;

app.get('/', (req, res, next) => {
  const
    options = {
      root: `${__dirname}/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file = 'index.html', options, err => {
    if (err) {
      console.log(err);
      next();
    } else {
      console.log(`sent: ${file}`);
    }
  });
});

app.get('/assets/:file', (req, res, next) => {
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
      next();
    } else {
      // console.log(`Sent: ${file}`);
    }
  });
});

app.get('/assets/:type/:file', (req, res, next) => {
  const {type, file} = req.params,
    options = {
      root: `${__dirname}/assets/${type}/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file, options, err => {
    if (err) {
      console.log(err);
      next();
    } else {
      // console.log(`Sent: ${file}`);
    }
  });
});

app.get('/src/:sector/:file', (req, res, next) => {
  const {sector, file} = req.params,
    options = {
      root: `${__dirname}/src/${sector}/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file, options, err => {
    if (err) {
      console.log(err);
      next();
    } else {
      // console.log(`Sent: ${file}`);
    }
  });
});

app.get('/src/:sector/:folder/:file', (req, res, next) => {
  const {sector, folder, file} = req.params,
    options = {
      root: `${__dirname}/src/${sector}/${folder}/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file, options, err => {
    if (err) {
      console.log(err);
      next();
    } else {
      // console.log(`Sent: ${file}`);
    }
  });
});

app.get('/src/:sector/:folder/:subfolder/:file', (req, res, next) => {
  const {sector, subfolder, folder, file} = req.params,
    options = {
      root: `${__dirname}/src/${sector}/${folder}/${subfolder}/`,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
  res.sendFile(file, options, err => {
    if (err) {
      console.log(err);
      next();
    } else {
      // console.log(`Sent: ${file}`);
    }
  });
});

app.listen(PORT, _ => {
  console.log(`Server running on localhost:${PORT}`);
});
