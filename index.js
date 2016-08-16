const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const rp = require('request-promise');

const templates = require('./templates');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  if (req.query.venmo_challenge) {
    res.type('text').send(req.query.venmo_challenge);
  } else {
    res.sendStatus(400);
  }
});

app.post('/', (req, res) => {
  if (req.body && req.body.data) {
    const data = req.body.data;
    if (data.action === 'pay' && data.status === 'settled') {
      messageSlack({ attachments: templates.paid(data) });
    } else if (data.action === 'charge' && data.status === 'pending') {
      messageSlack({ attachments: templates.charged(data) });
    } else if (data.action === 'charge' && data.status === 'cancelled') {
      messageSlack({ attachments: templates.cancelled(data) });
    } else {
      messageSlack(JSON.stringify(req.body.data, null, 2));
    }
    res.type('text').send('ok');
  } else {
    res.sendStatus(400);
  }
});

app.listen(3000, () => {
  console.log('Starting up!');
});

function messageSlack({ text, attachments }) {
  const options = {
    method: 'POST',
    uri: process.env.SLACK_WEBHOOK_URL,
    body: {
      text,
      attachments,
    },
    json: true,
  };

  rp(options)
    .catch(err => console.error(err));
}
