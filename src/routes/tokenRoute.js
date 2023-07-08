const { Router } = require('express');
const intercambioCheck = require('../utils/validators.js');
const {intercambio, tokens, save}  = require('../controllers/tokenController.js');


const tokenRoute = Router();

tokenRoute.post('/calc', intercambioCheck(), intercambio);
tokenRoute.get('/tokens', tokens);
tokenRoute.get('/save', save);

module.exports = tokenRoute;