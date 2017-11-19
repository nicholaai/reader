export default thumbnail => {
  switch (thumbnail) {
    case 'self':
    case 'default':
    case 'nsfw':
    case 'image':
      return '/redditHolder.png';
    default:
      return thumbnail;
  }
};
