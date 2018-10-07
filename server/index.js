const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const smartLinkRoutes = require('./src/routes/SmartLinkRoutes')
const userRoutes = require('./src/routes/UserRoutes')


// App instance
const app = express()

// Server configuration
const BASE_PATH = '/'
const PORT = 6200

// Connect to DB
const MONGO_URL = 'mongodb://mongodb:27017/smart-link'
const CONNECTION_OPTION = {
  useNewUrlParser: true,
  keepAlive: true
}

mongoose.Promise = global.Promise

mongoose.connect(MONGO_URL, CONNECTION_OPTION)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.error('DB connection error:', err.stack);
    process.exit(1)
  })


// Registering middlewares
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Passport middleware
app.use(passport.initialize())
require('./config/passport')(passport)


// Registering routes
app.use(BASE_PATH, smartLinkRoutes)
app.use(BASE_PATH + 'users', userRoutes)

app.listen(PORT, () => {
  console.log('Express server running on: ', PORT);
});
