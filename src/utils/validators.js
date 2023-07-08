const { body } = require('express-validator');

module.exports = intercambioCheck = () => {
    return [
        body('moneda').notEmpty().withMessage(`Debe ingresar una moneda soportada por el app`)
        .isString().withMessage(`Debe ingresar caracteres no numeros`)
        .isIn(['btc', 'eth', 'usdt', 'bnb', 'usd', 'eur', 'bs'])
        .withMessage(`Debe ingresar una moneda soportada por el app`),
        body('monto').notEmpty().withMessage(`Debe ingresar una monto`)
        .isInt().withMessage(`Debe ingresar numeros no caracteres`)
    ]
};