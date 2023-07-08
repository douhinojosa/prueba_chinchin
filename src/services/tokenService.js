require('dotenv').config();
const axios = require('axios');
const puppeteer = require('puppeteer');
const Token = require("../models").tokens;

const usd = 1;

//busqueda del valor del bolivar en base al dolar haciendo scraping a la pagina de BCV
const get_bs = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.bcv.org.ve/', {
            waitUntil: "domcontentloaded",
          });
        const dolar_price = await page.evaluate(async () => {
        const strong = document.querySelector('#dolar strong');
            return strong.innerText;
        });
        //console.log(typeof dolar_price);
        await browser.close();
        return parseFloat(usd / Number(dolar_price.replace(',', '.')));
        //return Number(dolar_price);  
    } catch (e) {
        console.error(e);
    }
}; 

//valor del euro 
const get_euro = async () => {
    const raw = await axios.get(`${process.env.FREE_CURRENCY_API}${process.env.FREE_CURRENCY_API_KEY}`);
    const {EUR} = raw.data.data;
    return EUR;
};

//verificando estatus del API de coingecko 
const coingecko_status = async () => (await axios.get(`${process.env.COINGECKO_API}ping`)).data.gecko_says === '(V3) To the Moon!' ? true : false;

/* funcion para buscar el valor de los tokens en base a el estatus del API de coingecko esta es mucho mas rapida en respuesta que la de finance
se retorna un objeto con las monedas soportadas por el app */
const get_tokens = async () => {
    const status_api = await coingecko_status();
    let btc, eth, tether, bnb;
    try {
        if (status_api) {
            btc = Number((await axios.get(`${process.env.COINGECKO_API}coins/bitcoin`)).data.market_data.current_price.usd);
            eth = Number((await axios.get(`${process.env.COINGECKO_API}coins/ethereum`)).data.market_data.current_price.usd);
            tether = Number((await axios.get(`${process.env.COINGECKO_API}coins/tether`)).data.market_data.current_price.usd);
            bnb = Number((await axios.get(`${process.env.COINGECKO_API}coins/binancecoin`)).data.market_data.current_price.usd);
        } else {
            btc = Number((await axios.get(`${process.env.FINANCE_API}btcusd?apikey=${process.env.FINANCE_KEY}`)).data.price);
            eth = Number((await axios.get(`${process.env.FINANCE_API}ethusd?apikey=${process.env.FINANCE_KEY}`)).data.price);
            tether = Number((await axios.get(`${process.env.FINANCE_API}usdtusd?apikey=${process.env.FINANCE_KEY}`)).data.price);
            bnb = Number((await axios.get(`${process.env.FINANCE_API}bnbusd?apikey=${process.env.FINANCE_KEY}`)).data.price);
        }
        const bs = await get_bs() || 100;
        const euro = await get_euro();
        return { btc, eth, tether, bnb, bs, euro, usd };
    } catch (e) {
        console.error(e);
    }
};

//calculo del valor del monto de la moneda ingresada por el usuario
const total = (user_token_input, user_token_amount, token_price) => (user_token_input * user_token_amount) / token_price;

//funcion que retorna un objeto con el resultado del total del monto ingrasado por el usuario en cada token que el app soporta
const result = async (user_token_input, user_token_amount) => {
    try {
        //if (currency.includes(user_token_input) == false) throw new Error(`Moneda no soportada`);
        const tokens = await get_tokens();
        let results = [];
        Object.entries(tokens).map(([symbol, price]) => results.push({[symbol]: total(tokens[user_token_input], user_token_amount, price)}));
        return results;
    } catch (e) {
        throw new Error(e);
    }
};

const saveTokens = async () => {
    try {
        const tokens = await get_tokens();
        const alreadySaved = await Token.findAll();
        if (alreadySaved.length == 0) {
            Object.entries(tokens).map(async ([symbol, price]) => await Token.create({symbol, price}));
            return {message: `Tokens saved succesfully`};
        } else {
            return {message: `Already saved`};
        }
    } catch (e) {
        console.error(e);
    }
};

const updateTokens = async () => {
    try {
        const tokens = await get_tokens();
        Object.entries(tokens).map(async ([symbol, price]) => await Token.update({symbol}, {where: {price}}));
    } catch (error) {
        console.error(e);
    }
};

module.exports = {result, get_tokens, saveTokens, updateTokens};

/* result('bs', 100);

result('xmr', 90); */