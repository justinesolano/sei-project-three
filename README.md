# General Assembly Project 3: Jetflix
![Jetflix Logo](client/src/assets/jetflixlogo.png)
----
# Group Members:
* Justine Solano: https://github.com/justinesolano
* Jacqueline de Leeuw: https://github.com/jacquelinedeleeuw
* Oliver Lewis: https://github.com/olilewis1
* Andrew Ogilvy: https://github.com/aogilvy10


# Table of Contents
* Project Brief
* Project Description
* Technologies & Installation
* Process
   - Planning
   - Backend
   - Frontend
* Final Walkthrough
* Wins & bugs
* Extra Features

## Project Brief:
* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.

## Timeframe:
8 Days

## Description
Jetflix is a Netflix/Instagram inspired project. It is an app that aims to help users find a holiday/getaway using the destinations in the database. The destinations included are cities, towns and tourist spots. Users can also register with the site, favourite specific destinations, and post pictures of destinations they've been to and tag them with the location. These posts appear on the Explore page but only as the image, user owner and location. There is also a Feed page which shows activity of all users, such as their recent posts, recent likes, and recent comments.

### Deployed version:
https://jetflix-app.herokuapp.com/

To explore the app, use these login credentials:
 
<b>email</b>: admin@email.com <br />
<b>password</b>: adminpass

## Technologies used
### Frontend:
- React
- Axios
- Semantic UI React
- Semantic UI
- Bulma
- SASS
- HTTP-proxy-middleware
- React Router DOM
### Backend:
- Node
- MongoDB
- Mongoose
- Express
- Bcrypt
- jsonwebtoken
### Development tools:
- VSCode
- Insomnia
- Yarn
- Git & GitHub
- Google Chrome development tools
- Trello Board (planning)
- Adobe Photoshop 2021 (assets)
- Cloudinary
- Heroku (deployment)

## Installation
Clone or download sei-project-three repo then run these in Terminal:
* `mongod —dbpath ~/data/db` to run Mongo
* Open project and `yarn` to install yarn packages
* Split terminals in project
* `cd backend` in first Terminal to go into backend directory
* `yarn seed` to seed database
* `yarn serve` to run server
* `cd client` in second Terminal to go into frontend directory
* `yarn start` to start front-end server
* go to localhost:3000 in browser to see app

# PROCESS
## PLANNING (day 1)
### Concept
The base idea for Jetflix was the group's shared interest for travel. We thought it would be a good idea to make a travel app for users to browse for holiday destinations after COVID-19. We thought it would be a cool challenge to make a clone of an existing website. We picked Netflix because of it's browsing-based structure and we wanted to remake this with travel destinations instead of TV shows/movies. To give our app a distinguishing aspect from Netflix, we decided to incorporate an Instagram-based element. We wanted users to be able to share their travel pictures with each other and interact with these posts to maximise the app's ability to heighten social connections.

### Storyboard/Wireframes
![Jetflix Storyboard](client/src/assets/storyboard.jpeg)

### Trello Organisation
![Jetflix Trello](client/src/assets/trello.jpg)

Because there were so many components that were involved in our project and four of us, we used Trello to organize the project into smaller components. We decided to setup the backend together and then tackle the frontend individually by delegating different parts to each group member. We stayed on Zoom each day from beginning to end so that we could quickly communicate any problems or questions we had, also frequently needing to use screen share. We also used Slack extensively to send each other code snippets/project assets.

## BACKEND (day 2)
### Setup
We setup the backend together so there was no confusion about any of the models and the database. We created the backend using Mongoose and tackling it as a group made the process less complicated. One person typed and we used the Live Share extension pack so we could all see the progress on VSCode. Doing this also helped to see whether there was anything missing in the code that maybe other group members had missed and made debugging errors faster.

In terms of our API, we tried to find one that had a more comprehensive detail for each destination such as language, currency, key spots etc. Many of the APIs we found online were not free and/or not matching the details we wanted. We ended up creating our own API using destinations from https://www.lonelyplanet.com/, including using the website's images and descriptions.

We had two schemas: one for users and a second for main destinations.

The `userSchema` had an embedded `photoSchema` which in turn has two embedded schemas(`commentSchema` and `likesSchema`):
```javascript
const likesSchema = new mongoose.Schema({
  like: { type: Boolean, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: Object },
  image: { type: String, required: true },
  locationName: { type: String, required: true },
  comments: [commentSchema],
  likes: [likesSchema],
}, {
  timestamps: true,
})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 40 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photos: [photoSchema],
  myList: { type: Array, unique: true },
  myTags: { type: Array, unique: true },
})
```

This means that only authenticated users can post photos, and like and comment on these posts. The userSchema also has a `myList` field which allows users to add destinations to their favourites list that shows up on the homepage, and a `myTags` field which renders destinations on the Recommended For You slider upon login based on the user tags that are selected on the 'Pick your favourite destinations' dropdown during registration.
![Jetflix Tags](client/src/assets/mytags.jpg)


The `destinationSchema` also has an embedded schema `ratingSchema`:
```javascript
const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  country: { type: String, required: true },
  continent: { type: String, required: true },
  language: { type: String, required: true },
  currency: { type: String, required: true },
  highlights: { type: Array, required: true },
  suitableFor: { type: Array, required: true },
  tags: { type: Array, required: true },
  image: { type: String, required: true },
  ratings: [ratingSchema],
})
```
The routes were also straightforward to setup. We made sure there routes for even the likes, comments, user lists, and ratings.

Aside from some few errors due to missing code which were quickly fixed, the backend setup went smoothly and all our planned models were created.