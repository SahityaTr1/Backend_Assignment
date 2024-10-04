function simpleMovingAverageCrossover(prices, shortPeriod = 10, longPeriod = 20) {
  if (prices.length < longPeriod) {
    return 'hold';
  }

  const shortMA = calculateSMA(prices.slice(-shortPeriod));
  const longMA = calculateSMA(prices.slice(-longPeriod));

  if (shortMA > longMA) {
    return 'buy';
  } else if (shortMA < longMA) {
    return 'sell';
  }

  return 'hold';
}

function calculateSMA(prices) {
  return prices.reduce((sum, price) => sum + price, 0) / prices.length;
}

module.exports = { simpleMovingAverageCrossover };