const { getStockPrice } = require('./api');
const { simpleMovingAverageCrossover } = require('./tradingStrategy');

class TradingBot {
  constructor(symbol, initialBalance) {
    this.symbol = symbol;
    this.balance = initialBalance;
    this.shares = 0;
    this.trades = [];
    this.priceHistory = [];
  }

  async run(iterations) {
    for (let i = 0; i < iterations; i++) {
      const { price } = await getStockPrice(this.symbol);
      this.priceHistory.push(price);

      const action = simpleMovingAverageCrossover(this.priceHistory);
      this.executeAction(action, price);

      console.log(`Iteration ${i + 1}: Price = $${price.toFixed(2)}, Action = ${action}`);
    }

    this.printSummary();
  }

  executeAction(action, price) {
    if (action === 'buy' && this.balance >= price) {
      const sharesToBuy = Math.floor(this.balance / price);
      this.shares += sharesToBuy;
      this.balance -= sharesToBuy * price;
      this.trades.push({ action: 'buy', shares: sharesToBuy, price });
    } else if (action === 'sell' && this.shares > 0) {
      this.balance += this.shares * price;
      this.trades.push({ action: 'sell', shares: this.shares, price });
      this.shares = 0;
    }
  }

  printSummary() {
    console.log('\nTrading Summary:');
    console.log('----------------');
    this.trades.forEach((trade, index) => {
      console.log(`Trade ${index + 1}: ${trade.action} ${trade.shares} shares at $${trade.price.toFixed(2)}`);
    });

    const finalStockValue = this.shares * this.priceHistory[this.priceHistory.length - 1];
    const totalValue = this.balance + finalStockValue;
    const profitLoss = totalValue - parseFloat(process.env.INITIAL_BALANCE);

    console.log('\nFinal Balance:');
    console.log(`Cash: $${this.balance.toFixed(2)}`);
    console.log(`Stock Value: $${finalStockValue.toFixed(2)}`);
    console.log(`Total Value: $${totalValue.toFixed(2)}`);
    console.log(`Profit/Loss: $${profitLoss.toFixed(2)}`);
  }
}

module.exports = TradingBot;