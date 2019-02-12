const express = require('express');
var app = express();

const PORT = 8012;

app.get('/', (req, res, next) => {
  res.redirect('/progress');
});

app.get('/ttkC', (req, res, next) => {
  const file = 'TabletopKnightsCover.jpg',
    options = {
      root: `${__dirname}`,
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
      console.log(`Sent: ${file}`);
    }
  });
});

app.get('/progress', (req, res, next) => {
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
      next();
    } else {
      console.log(`Sent: ${file}`);
    }
  });
});

app.get('/workshop', (req, res, next) => {
  const file = 'index.html',
    options = {
      root: `${__dirname}/workshop/`,
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
      console.log(`Sent: ${file}`);
    }
  });
});

app.get('/workshop/:file', (req, res, next) => {
  const {file} = req.params,
    options = {
      root: `${__dirname}/workshop/`,
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
      console.log(`Sent: ${file}`);
    }
  });
});

app.get('/pierre/:file', (req, res, next) => {
  const {file} = req.params,
    options = {
      root: `${__dirname}/workshop/pierre/`,
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
      console.log(`Sent: ${file}`);
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
      next();
    } else {
      // console.log(`Sent: ${file}`);
    }
  });
});

app.get('/src/:sector/:file', (req, res, next) => {
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
      next();
    } else {
      // console.log(`Sent: ${file}`);
    }
  });
});

app.get('/src/:sector/:folder/:file', (req, res, next) => {
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
      next();
    } else {
      // console.log(`Sent: ${file}`);
    }
  });
});

app.get('/src/:sector/:folder/:subfolder/:file', (req, res, next) => {
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
      next();
    } else {
      // console.log(`Sent: ${file}`);
    }
  });
});

app.listen(PORT, _ => {
  console.log(`Server running on localhost:${PORT}`);
});
