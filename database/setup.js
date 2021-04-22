const db = require('./connection')
require('../models/User')
require('../models/Post')

db.sync()