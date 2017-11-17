/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Likes = new Mongo.Collection('Likes');

Likes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Likes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Likes.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title of the liked post.'
  },
  link: {
    type: String,
    label: 'Link to the associated liked post.'
  },
  numComments: {
    type: Number,
    label: 'Number of comments on the liked post'
  },
  thumbnail: {
    type: String,
    label: 'Thumbnail media for the post.'
  },
  redditId: {
    type: String,
    label: 'Associated reddit ID of the post'
  },
  owner: {
    type: String,
    label: 'The ID of the user this like belongs to.'
  },
  createdAt: {
    type: String,
    label: 'Date like was created',
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updatedAt: {
    type: String,
    label: 'Date like was late updated.',
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  }
});
