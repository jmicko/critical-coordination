## Prerequisites

If you are installing this to a local host/machine, you will need the following software  installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Postico](https://https://eggerapps.at/postico/)


- an IDE (editor) of your choosing such as [VS-Code](https://code.visualstudio.com/download)

## Development Setup Instructions
- Sign up for a free account and get an API key from [Shippo](https://goshippo.com)
  - Under main page go to Settings -> Integration -> API and generate a Live Key

- Choose a gmail account to send your task notifications out.  You will need the email address and password below.
  - Under Settings -> Security -> Less Secure App Access -> turn on "less secure access" to allow the program to use this email

- Run `npm install` in your editor of 
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SHIPPO_API_KEY=<your SHIPPO API Key>
  SERVER_SESSION_SECRET=<a random phrase or string to encrypt your sessions>
  REACT_APP_EMAIL_USER=<gmail address you want to send emails>
  REACT_APP_EMAIL_PASSWORD=<password for the gmail account>
  CLIENT_URL=<address where the app is hosted>
  RESET_PASSWORD_KEY=<another random key that will encrypt lost password tokens>
  ```
  Here's a site that can help you: [https://passwordsgenerator.net/]
  

## Production Build
Create a database in POSTICO called critical_coordination.  Copy the database information over from the database.sql file included and run it to create your database.

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`


## Deployment

For this step you will need a Heroku account and install heroku CLI on your machine.

1. Create a new Heroku project
  - $ heroku create 
2. Link the Heroku project to the project GitHub Repo
  - $ git push heroku master
3. Create an Heroku Postgres database
  - $ heroku addons:create heroku-postgresql:hobby-dev
4. Connect to the Heroku Postgres database from Postico
  - $ heroku pg:push critical_coordination DATABASE_URL
5. Navigate to heroku's website, log in as you and add environment variables for the following: 
Settings -> Config Vars -> Reveal Vars -> add in the following key/value pairs:
  - SHIPPO_API_KEY=<your SHIPPO API Key>
  - SERVER_SESSION_SECRET=<a random phrase or string to encrypt your sessions>
  - REACT_APP_EMAIL_USER=<gmail address you want to send emails>
  - REACT_APP_EMAIL_PASSWORD=<password for the gmail account>
  - CLIENT_URL=<address where the app is hosted>
  - RESET_PASSWORD_KEY=<another random key that will encrypt lost password tokens>

