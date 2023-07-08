const { validationResult } = require('express-validator');
const {result, get_tokens, saveTokens}  = require("../services/tokenService.js");

const intercambio = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const {moneda, monto} = req.body;
            const results = await result(moneda, monto);
            console.log(results)
            res.status(200).json(results);
        } else{
            res.status(400).json({errors: errors.array()[0]});
        }
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
};

const tokens = async (req, res) => {
    try {
        const tokens_prices = await get_tokens();
        res.status(200).json(tokens_prices);
    } catch (e) {
        console.error(e);
        res.status(500).json(e.message);
    }
};

const save = async (req, res) => {
    try {
        const result = await saveTokens();
        res.status(200).json({message: result.message});
    } catch (error) {
        console.error(e);
        res.status(500).json(e.message);
    }
}

module.exports = {intercambio, tokens, save};