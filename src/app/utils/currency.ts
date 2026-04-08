// Currency conversion utilities for frontend
// These match the backend rates

export const EXCHANGE_RATES = {
  BRL: 1.0,
  USD: 0.192,
  EUR: 0.178,
};

export const TO_RATES = {
  BRL: 1.0,
  USD: 5.20,
  EUR: 5.65,
};

/**
 * Convert price from one currency to another
 */
export const convertCurrency = (
  price: number,
  fromCurrency: string = 'BRL',
  toCurrency: string = 'BRL'
): number => {
  if (fromCurrency === toCurrency) return price;

  const priceInBRL = price * TO_RATES[fromCurrency as keyof typeof TO_RATES];
  const convertedPrice = priceInBRL / TO_RATES[toCurrency as keyof typeof TO_RATES];

  return Math.round(convertedPrice * 100) / 100;
};

/**
 * Calculate points for 10% discount (10% of price, rounded up)
 */
export const calculatePointsFor10Percent = (price: number): number => {
  return Math.ceil(price * 0.1);
};

/**
 * Format currency for display
 */
export const formatCurrency = (value: number, currency: string = 'BRL'): string => {
  const formatters: Record<string, Intl.NumberFormat> = {
    BRL: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
    USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }),
  };

  return formatters[currency]?.format(value) || `${value} ${currency}`;
};

/**
 * Get all available currencies
 */
export const getAvailableCurrencies = () => [
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$' },
  { code: 'USD', name: 'Dólar Americano', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
];

/**
 * Get currency symbol
 */
export const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    BRL: 'R$',
    USD: '$',
    EUR: '€',
  };
  return symbols[currency] || currency;
};