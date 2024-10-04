const axios = require('axios');

async function getStockPrice(symbol) {
  try {
    // In a real scenario, you would use the actual API endpoint
    // For this example, we'll generate a random price
    const price = Math.random() * 100 + 50; // Random price between 50 and 150
    return { symbol, price };
  } catch (error) {
    console.error('Error fetching stock price:', error);
    throw error;
  }
}

module.exports = { getStockPrice };