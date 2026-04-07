import type { Transaction } from '../types';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
const olderDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'numeric',
  day: 'numeric',
  year: '2-digit',
});
const detailDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'numeric',
  day: 'numeric',
  year: '2-digit',
});

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}

export function formatTransactionAmount(transaction: Transaction) {
  const amount = formatCurrency(transaction.amount);
  return transaction.type === 'Payment' ? `+${amount}` : amount;
}

export function formatTransactionMeta(transaction: Transaction, now = new Date()) {
  const parts = [];

  if (transaction.pending) {
    parts.push('Pending');
  }

  parts.push(transaction.description);

  const detail = [transaction.authorizedUser, formatTransactionDate(transaction.date, now)]
    .filter(Boolean)
    .join(' - ');

  return {
    descriptionLine: parts.join(' - '),
    detailLine: detail,
  };
}

export function formatTransactionDate(dateValue: string, now = new Date()) {
  const date = createLocalDate(dateValue);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTransactionDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const daysDiff = Math.floor(
    (startOfToday.getTime() - startOfTransactionDay.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (daysDiff >= 0 && daysDiff < 7) {
    if (daysDiff === 0) {
      return 'Today';
    }

    if (daysDiff === 1) {
      return 'Yesterday';
    }

    return dayFormatter.format(date);
  }

  return olderDateFormatter.format(date);
}

export function formatTransactionDetailDate(dateValue: string, time = '12:47') {
  return `${detailDateFormatter.format(createLocalDate(dateValue))}, ${time}`;
}

export function formatDailyPoints(points: number) {
  if (points > 1000) {
    return `${Math.round(points / 1000)}K`;
  }

  return String(points);
}

export function calculateDailyPoints(now = new Date()) {
  const seasonDay = getSeasonDay(now);

  if (seasonDay === 1) {
    return 2;
  }

  if (seasonDay === 2) {
    return 3;
  }

  let twoDaysAgo = 2;
  let yesterday = 3;
  let today = 0;

  for (let day = 3; day <= seasonDay; day += 1) {
    today = Math.round(twoDaysAgo + yesterday * 0.6);
    twoDaysAgo = yesterday;
    yesterday = today;
  }

  return today;
}

function getSeasonDay(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const seasonStart = getSeasonStart(year, month);

  return (
    Math.floor((startOfDay(date).getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
  );
}

function getSeasonStart(year: number, month: number) {
  if (month >= 11) {
    return new Date(year, 11, 1);
  }

  if (month >= 8) {
    return new Date(year, 8, 1);
  }

  if (month >= 5) {
    return new Date(year, 5, 1);
  }

  if (month >= 2) {
    return new Date(year, 2, 1);
  }

  return new Date(year - 1, 11, 1);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function createLocalDate(dateValue: string) {
  const [year, month, day] = dateValue.split('-').map(Number);
  return new Date(year, month - 1, day);
}
