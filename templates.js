const templates = {
  charged: (data) => ({
    color: "warning",
    author_name: data.actor.display_name,
    author_icon: data.actor.profile_picture_url,
    thumb_url: data.target.user.profile_picture_url,
    title: `${data.actor.display_name} charged ${data.target.user.display_name} $${data.amount}`,
    text: data.note,
    ts: Date.parse(data.date_created),
  }),
  cancelled: (data) => ({
    color: "danger",
    author_name: data.actor.display_name,
    author_icon: data.actor.profile_picture_url,
    thumb_url: data.target.user.profile_picture_url,
    title: `${data.actor.display_name} cancelled their charge to ${data.target.user.display_name} for $${data.amount}`,
    text: data.note,
    ts: Date.parse(data.date_completed),
  }),
  paid: (data) => ({
    color: "good",
    author_name: data.actor.display_name,
    author_icon: data.actor.profile_picture_url,
    thumb_url: data.target.user.profile_picture_url,
    title: `${data.actor.display_name} paid ${data.target.user.display_name} $${data.amount}`,
    text: data.note,
    ts: Date.parse(data.date_completed),
  }),
};

module.exports = templates;
