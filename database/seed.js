const User = require('../models/User')


User.create({email:'admin@email.com', name: 'Ad Min', password:'grillkorv', role: 'admin'})
User.create({email:'user1@email.com', name: 'User 1', password:'grillkorv'})
User.create({email:'user2@email.com', name: 'User 2', password:'grillkorv'})
User.create({email:'user3@email.com', name: 'User 3', password:'grillkorv'})
User.create({email:'user4@email.com', name: 'User 4', password:'grillkorv'})