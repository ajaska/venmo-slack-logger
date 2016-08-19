const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const templates = require('./templates');
const messageSlack = require('./slack');

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
    if ({}.hasOwnProperty.call(templates, data.action) &&
        {}.hasOwnProperty.call(templates[data.action], data.status)) {
      const attachment = templates[data.action][data.status](data);
      messageSlack({ attachment });
    } else {
      messageSlack({ text: JSON.stringify(req.body.data, null, 2) });
    }
    res.type('text').send('ok');
  } else {
    res.sendStatus(400);
  }
});

app.listen(3000, () => {
  console.log('Starting up!');
});
