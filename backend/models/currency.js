// Exchange rates (Real/BRL as base currency)
// These should ideally come from an external API like Fixer.io or Open Exchange Rates
// For now, using fixed rates that should be updated periodically

const EXCHANGE_RATES = {
  BRL: 1.0,        // Base currency
  USD: 0.192,      // 1 BRL = ~0.192 USD (adjust based on current rates)
  EUR: 0.178,      // 1 BRL = ~0.178 EUR (adjust based on current rates)
};

// Reverse rates (multiply to convert TO these currencies)
const TO_RATES = {
  BRL: 1.0,
  USD: 5.20,       // 1 USD = ~5.20 BRL
  EUR: 5.65,       // 1 EUR = ~5.65 BRL
};

/**
 * Convert price from one currency to another
 * @param {number} price - The price to convert
 * @param {string} fromCurrency - Source currency (BRL, USD, EUR)
 * @param {string} toCurrency - Target currency (BRL, USD, EUR)
 * @returns {number} Converted price
 */
export const convertCurrency = (price, fromCurrency = 'BRL', toCurrency = 'BRL') => {
  if (fromCurrency === toCurrency) return price;

  // Convert to BRL first
  const priceInBRL = price * TO_RATES[fromCurrency];

  // Then convert from BRL to target currency
  const convertedPrice = priceInBRL / TO_RATES[toCurrency];

  return Math.round(convertedPrice * 100) / 100; // Round to 2 decimal places
};

/**
 * Calculate points for 10% discount based on price
 * @param {number} price - Product price
 * @returns {number} Points needed for 10% discount (10% of price, rounded up)
 */
export const calculatePointsFor10Percent = (price) => {
  return Math.ceil(price * 0.1);
};

/**
 * Format currency for display
 * @param {number} value - Numeric value
 * @param {string} currency - Currency code (BRL, USD, EUR)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'BRL') => {
  const formatters = {
    BRL: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
    USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }),
  };

  return formatters[currency]?.format(value) || `${value} ${currency}`;
};

/**
 * Get all available currencies
 * @returns {Array} Array of currency objects with code and symbol
 */
export const getAvailableCurrencies = () => {
  return [
    { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$' },
    { code: 'USD', name: 'Dólar Americano', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
  ];
};

export default {
  convertCurrency,
  calculatePointsFor10Percent,
  formatCurrency,
  getAvailableCurrencies,
  TO_RATES,
  EXCHANGE_RATES,
};