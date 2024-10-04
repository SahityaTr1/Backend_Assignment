require('dotenv').config();
const TradingBot = require('./tradingBot');

const symbol = 'AAPL'; // Example stock symbol
const initialBalance = parseFloat(process.env.INITIAL_BALANCE);
const iterations = 100; // Number of trading iterations

const bot = new TradingBot(symbol, initialBalance);
bot.run(iterations);