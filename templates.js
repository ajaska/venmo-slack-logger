const defaults = (data) => ({
  author_name: data.actor.display_name,
  author_icon: data.actor.profile_picture_url,
  thumb_url: data.target.user.profile_picture_url,
  text: data.note,
  ts: Date.parse(data.date_completed),
});

function template(options) {
  return (data) => (Object.assign({}, defaults(data), options(data)));
}

const templates = {
  pay: {
    settled: template((data) => ({
      color: 'good',
      title: `${data.actor.display_name} paid ${data.target.user.display_name} $${data.amount}`,
    })),
  },
  charge: {
    pending: template((data) => ({
      color: 'warning',
      title: `${data.actor.display_name} charged ${data.target.user.display_name} $${data.amount}`,
      ts: Date.parse(data.date_created),
    })),
    cancelled: template((data) => ({
      color: 'danger',
      title: `${data.actor.display_name} cancelled their charge to ${data.target.user.display_name} for $${data.amount}`,
    })),
    settled: template((data) => ({
      color: 'good',
      title: `${data.actor.display_name}'s charge to ${data.target.user.display_name} for $${data.amount} was completed`,
    })),
  },
};

module.exports = templates;
