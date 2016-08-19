const rp = require('request-promise');

function messageSlack({ text, attachment }) {
  const options = {
    method: 'POST',
    uri: process.env.SLACK_WEBHOOK_URL,
    body: {
      text,
      attachments: attachment && [attachment],
    },
    json: true,
  };

  rp(options)
    .catch(err => console.error(err));
}

module.exports = messageSlack;
