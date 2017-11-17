import { Meteor } from 'meteor/meteor';
import Likes from '../Likes';

Meteor.publish('likes', function likes() {
  return Likes.find({ owner: this.userId });
});
