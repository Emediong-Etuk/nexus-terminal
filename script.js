// Mock cryptocurrency data
const cryptoData = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 64285.42,
    change24h: 2.34,
    volume: '28.4B',
    marketCap: '1.26T',
    sparklineData: [62800, 63200, 62900, 63500, 64100, 63800, 64400, 64285]
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3421.18,
    change24h: 3.67,
    volume: '14.2B',
    marketCap: '411.3B',
    sparklineData: [3300, 3350, 3320, 3380, 3410, 3390, 3425, 3421]
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 142.87,
    change24h: -1.24,
    volume: '3.1B',
    marketCap: '63.8B',
    sparklineData: [145, 144, 146, 144.5, 143, 143.5, 142.5, 142.87]
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    price: 587.23,
    change24h: 1.89,
    volume: '1.8B',
    marketCap: '87.2B',
    sparklineData: [575, 580, 578, 583, 586, 584, 588, 587.23]
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    price: 0.6234,
    change24h: -2.14,
    volume: '2.4B',
    marketCap: '34.1B',
    sparklineData: [0.638, 0.635, 0.640, 0.632, 0.628, 0.625, 0.624, 0.6234]
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.4521,
    change24h: 0.87,
    volume: '890M',
    marketCap: '15.9B',
    sparklineData: [0.448, 0.450, 0.449, 0.451, 0.453, 0.451, 0.452, 0.4521]
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 36.42,
    change24h: 4.23,
    volume: '645M',
    marketCap: '14.2B',
    sparklineData: [34.8, 35.2, 35.0, 35.6, 36.1, 35.9, 36.5, 36.42]
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.1423,
    change24h: -0.54,
    volume: '1.2B',
    marketCap: '20.3B',
    sparklineData: [0.143, 0.144, 0.143, 0.142, 0.143, 0.142, 0.142, 0.1423]
  }
];

// Render watchlist
function renderWatchlist() {
  const watchlistContainer = document.getElementById('watchlist');
  
  watchlistContainer.innerHTML = cryptoData.map(coin => {
    const isPositive = coin.change24h > 0;
    const changeColor = isPositive ? 'text-[#00ff9d]' : 'text-[#ff4757]';
    const sparklineId = `sparkline-${coin.symbol}`;
    
    return `
      <div class="p-4 hover:bg-[#00ff9d]/5 cursor-pointer transition-all hover-lift">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-[#00ff9d]/20 to-[#00f7ff]/20 rounded-lg flex items-center justify-center border border-[#00ff9d]/30">
              <span class="orbitron font-bold text-sm text-[#00ff9d]">${coin.symbol}</span>
            </div>
            <div>
              <div class="font-semibold text-white text-sm">${coin.name}</div>
              <div class="text-xs text-gray-500">${coin.symbol}/USDT</div>
            </div>
          </div>
          <canvas id="${sparklineId}" class="sparkline"></canvas>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="orbitron font-bold text-white">$${coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div class="${changeColor} font-semibold text-sm">
            ${isPositive ? '+' : ''}${coin.change24h.toFixed(2)}%
          </div>
        </div>
        
        <div class="flex items-center justify-between mt-2 text-xs text-gray-500">
          <div>Vol: ${coin.volume}</div>
          <div>Cap: ${coin.marketCap}</div>
        </div>
      </div>
    `;
  }).join('');
  
  // Render sparklines
  cryptoData.forEach(coin => {
    renderSparkline(`sparkline-${coin.symbol}`, coin.sparklineData, coin.change24h > 0);
  });
}

// Render sparkline chart
function renderSparkline(canvasId, data, isPositive) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const color = isPositive ? '#00ff9d' : '#ff4757';
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        data: data,
        borderColor: color,
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}

// Generate candlestick data
function generateCandlestickData() {
  const data = [];
  let basePrice = 64000;
  
  for (let i = 0; i < 30; i++) {
    const open = basePrice + (Math.random() - 0.5) * 1000;
    const close = open + (Math.random() - 0.5) * 800;
    const high = Math.max(open, close) + Math.random() * 400;
    const low = Math.min(open, close) - Math.random() * 400;
    
    data.push({
      x: new Date(Date.now() - (29 - i) * 3600000).getTime(),
      o: open,
      h: high,
      l: low,
      c: close
    });
    
    basePrice = close;
  }
  
  return data;
}

// Render candlestick chart
function renderCandlestickChart() {
  const ctx = document.getElementById('candlestickChart').getContext('2d');
  const data = generateCandlestickData();
  
  new Chart(ctx, {
    type: 'candlestick',
    data: {
      datasets: [{
        label: 'BTC/USDT',
        data: data,
        color: {
          up: '#00ff9d',
          down: '#ff4757',
          unchanged: '#999'
        },
        borderColor: {
          up: '#00ff9d',
          down: '#ff4757',
          unchanged: '#999'
        }
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10, 14, 20, 0.95)',
          borderColor: 'rgba(0, 255, 157, 0.3)',
          borderWidth: 1,
          titleColor: '#e0e6ed',
          bodyColor: '#e0e6ed',
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function(context) {
              const point = context.raw;
              return [
                `Open: $${point.o.toFixed(2)}`,
                `High: $${point.h.toFixed(2)}`,
                `Low: $${point.l.toFixed(2)}`,
                `Close: $${point.c.toFixed(2)}`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'hour',
            displayFormats: {
              hour: 'HH:mm'
            }
          },
          grid: {
            color: 'rgba(0, 255, 157, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#6b7280',
            font: {
              family: 'JetBrains Mono',
              size: 10
            }
          }
        },
        y: {
          position: 'right',
          grid: {
            color: 'rgba(0, 255, 157, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#6b7280',
            font: {
              family: 'JetBrains Mono',
              size: 10
            },
            callback: function(value) {
              return '$' + value.toFixed(0);
            }
          }
        }
      }
    }
  });
}

// Generate order book data
function generateOrderBook() {
  const asks = [];
  const bids = [];
  const midPrice = 64285.42;
  
  // Generate asks (sell orders)
  for (let i = 0; i < 15; i++) {
    const price = midPrice + (i + 1) * (Math.random() * 3 + 2);
    const amount = Math.random() * 2 + 0.1;
    asks.push({
      price: price,
      amount: amount,
      total: price * amount
    });
  }
  
  // Generate bids (buy orders)
  for (let i = 0; i < 15; i++) {
    const price = midPrice - (i + 1) * (Math.random() * 3 + 2);
    const amount = Math.random() * 2 + 0.1;
    bids.push({
      price: price,
      amount: amount,
      total: price * amount
    });
  }
  
  return { asks: asks.reverse(), bids };
}

// Render order book
function renderOrderBook() {
  const { asks, bids } = generateOrderBook();
  const orderBookContainer = document.getElementById('orderBook');
  
  const maxTotal = Math.max(
    ...asks.map(a => a.total),
    ...bids.map(b => b.total)
  );
  
  const renderOrder = (order, type) => {
    const depthPercent = (order.total / maxTotal) * 100;
    const textColor = type === 'ask' ? 'text-[#ff4757]' : 'text-[#00ff9d]';
    
    return `
      <div class="relative grid grid-cols-3 text-xs py-1.5 px-2 hover:bg-[#00ff9d]/5 cursor-pointer transition-colors">
        <div class="depth-bar ${type}" style="width: ${depthPercent}%"></div>
        <div class="${textColor} font-semibold relative z-10">${order.price.toFixed(2)}</div>
        <div class="text-right text-gray-400 relative z-10">${order.amount.toFixed(4)}</div>
        <div class="text-right text-gray-500 relative z-10">${order.total.toFixed(2)}</div>
      </div>
    `;
  };
  
  const asksHtml = asks.slice(0, 8).map(ask => renderOrder(ask, 'ask')).join('');
  const bidsHtml = bids.slice(0, 8).map(bid => renderOrder(bid, 'bid')).join('');
  
  orderBookContainer.innerHTML = asksHtml + bidsHtml;
}

// Generate recent trades
function generateRecentTrades() {
  const trades = [];
  const basePrice = 64285.42;
  const now = Date.now();
  
  for (let i = 0; i < 25; i++) {
    const price = basePrice + (Math.random() - 0.5) * 100;
    const amount = Math.random() * 0.5 + 0.01;
    const timestamp = now - i * (Math.random() * 5000 + 2000);
    const isBuy = Math.random() > 0.5;
    
    trades.push({
      price,
      amount,
      timestamp,
      isBuy
    });
  }
  
  return trades;
}

// Render recent trades
function renderRecentTrades() {
  const trades = generateRecentTrades();
  const tradesContainer = document.getElementById('recentTrades');
  
  tradesContainer.innerHTML = trades.map(trade => {
    const timeAgo = Math.floor((Date.now() - trade.timestamp) / 1000);
    const color = trade.isBuy ? 'text-[#00ff9d]' : 'text-[#ff4757]';
    
    return `
      <div class="grid grid-cols-3 text-xs py-1.5 px-2 hover:bg-[#00ff9d]/5 cursor-pointer transition-colors">
        <div class="${color} font-semibold">${trade.price.toFixed(2)}</div>
        <div class="text-right text-gray-400">${trade.amount.toFixed(4)}</div>
        <div class="text-right text-gray-500">${timeAgo}s</div>
      </div>
    `;
  }).join('');
}

// Format time ago
function formatTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h`;
}

// Live updates simulation
function simulateLiveUpdates() {
  // Update order book every 2 seconds
  setInterval(() => {
    renderOrderBook();
  }, 2000);
  
  // Update recent trades every 1.5 seconds
  setInterval(() => {
    renderRecentTrades();
  }, 1500);
  
  // Update prices every 3 seconds
  setInterval(() => {
    cryptoData.forEach(coin => {
      const change = (Math.random() - 0.5) * 0.02;
      coin.price = coin.price * (1 + change);
      coin.change24h = coin.change24h + (Math.random() - 0.5) * 0.1;
      
      // Update sparkline data
      coin.sparklineData.shift();
      coin.sparklineData.push(coin.price);
    });
    
    renderWatchlist();
  }, 3000);
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  renderWatchlist();
  renderCandlestickChart();
  renderOrderBook();
  renderRecentTrades();
  simulateLiveUpdates();
});