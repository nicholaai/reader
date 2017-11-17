export default (item, likes) => likes.find(like => like.redditId === item.id);
