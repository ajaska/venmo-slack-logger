const express = require('express');

const app = express();

app.get('/', (req, res) => {
  if (req.query.venmo_challenge) {
		res.set('Content-Type', 'text/plain');
    res.send(req.query.venmo_challenge);
  } else {
    res.status(400).send('Bad Request');
  }
});

app.listen(3000, () => {
  console.log('Starting up!');
});
