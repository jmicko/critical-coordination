
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const resetRouter = require('./routes/reset.router');
const adminRouter = require('./routes/admin.router');
const taskRouter = require('./routes/task.router');
const projectRouter = require('./routes/project.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/reset', resetRouter);
app.use('/api/admin', adminRouter);
app.use('/api/task', taskRouter);
app.use('/api/project', projectRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


const cron = require('node-cron');
let count = 1;
let hourCount = 1
cron.schedule("0 52 10 * * *", function(){
  console.log('running at 1052am daily: ', count);
  count++
})

cron.schedule("0 0 * * * *", function(){
  console.log('running top of every hour: ', hourCount);
  hourCount++;
})