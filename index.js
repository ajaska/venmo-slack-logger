const express = require('express');
const rp =  require('request-promise');

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

function messageSlack(text) {
  const options = {
    method: 'POST',
    uri: process.env.SLACK_WEBHOOK_URL,
    body: {
      text,
    },
    json: true,
  };

  rp(options)
    .catch(err => console.error(err))
}
