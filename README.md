## reader

This application lets users view and select their favorite "hot" posts on reddit.

<img src="/public/demo.png" width="1000" alt="project screenshot">

### Technologies Used

- Meteor
- React
- React Router
- MongoDB
- JSX
- Sass
- NPM
- ESlint - Airbnb JavaScript Style Guide

### Services Used

- Meteor-Now
- mLab

## Getting Started

To install the packages, you can run:

### `meteor npm install` 

To run the app, execute:

### `npm start` 

### Likes Collection

Currently the app keeps track of likes for each individual user. That means, two users can like the same post on their respective accounts, and the post would be added to the "likes" collection twice with different _id's and "owners" (ID of user who liked the post). This was done for simplicity and with the understanding that this is an extremely small scale demo application that will never reach production.

If this app was intended to be used in production, this architecture would be changed as you wouldn't want to store a post multiple times, especially considering Reddit posts can get thousands of upvotes. For example: you can store each liked post once with a "likers" property, which would be an array of user ID's that have liked the post. You would then add / remove ID's to this array, and remove the post from your likes collection if the array were to reach empty. 
