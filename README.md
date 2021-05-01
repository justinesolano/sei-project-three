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
