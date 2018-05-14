const express = require('express'),
      hbs = require('hbs'),
      fs = require('fs');

const app = express(),
      port = 3000,
      logFile = 'server.log';

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile(logFile, log + '\n', err => {
    if (err) {
      console.log('Unable to append to server log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance mode'
//   });
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerPartials(`${__dirname}/views/partials`);

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome!',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request',
    errorCode: 404
  });
});

app.get('/maint', (req, res) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Maintenance mode'
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
