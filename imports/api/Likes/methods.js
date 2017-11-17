import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Likes from './Likes';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'likes.insert': function likesInsert(like) {
    check(like, {
      title: String,
      permalink: String,
      numComments: Number,
      thumbnail: String,
      redditId: String
    });

    try {
      return Likes.insert({ owner: this.userId, ...like });
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  },
  'likes.remove': function likesRemove(likeId) {
    check(likeId, String);

    try {
      return Likes.remove(likeId);
    } catch (exception) {
      throw new Meteor.Error('500', exception);
    }
  }
});

rateLimit({
  methods: ['documents.inserts', 'documents.remove'],
  limit: 5,
  timeRange: 1000
});
