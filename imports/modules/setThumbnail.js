export default thumbnail => {
  switch (thumbnail) {
    case 'self':
    case 'default':
    case 'nsfw':
    case 'image':
    case 'spoiler':
      return '/redditHolder.png';
    default:
      return thumbnail;
  }
};
