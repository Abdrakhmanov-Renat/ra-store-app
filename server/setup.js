require('dotenv').config();
const { Token } = require('./src/models/Token.model');
const { User } = require('./src/models/User.model');
const { Cart } = require('./src/models/Cart.model');
const { Like } = require('./src/models/Like.model');
const { ProductShort } = require('./src/models/ProductShort.model');
const { ProductPhone } = require('./src/models/ProductPhone.model');
const { ProductTablet } = require('./src/models/ProductTablet.model');
const { ProductAccessory } = require('./src/models/ProductAccessory.model');

const { client } = require('./src/utils/db');

// client.sync({ force: true }); To delete and save new DB
// To upgrade DB without deleting
client.sync({ alter: true });
