import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { TransactionRow } from '../components/TransactionRow';
import { useTransactions } from '../hooks/useTransactions';
import { calculateDailyPoints, formatCurrency, formatDailyPoints } from '../utils/formatters';

const CARD_LIMIT = 1500;

export function TransactionsList() {
  const { transactions, isLoading, error } = useTransactions();
  const cardBalance = useMemo(() => Math.round((12 + Math.random() * 70) * 100) / 100, []);
  const available = CARD_LIMIT - cardBalance;
  const dailyPoints = formatDailyPoints(calculateDailyPoints());
  const latestTransactions = transactions.slice(0, 10);

  return (
    <section className="screen transactions-screen">
      <div className="dashboard-grid">
        <article className="summary-card balance-card">
          <span>Card Balance</span>
          <strong>{formatCurrency(cardBalance)}</strong>
          <small>{formatCurrency(available)} Available</small>
        </article>
        <article className="summary-card payment-card">
          <span>No Payment Due</span>
          <small>You've paid your September balance.</small>
          <div className="checkmark">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </article>
        <article className="summary-card points-card">
          <span>Daily Points</span>
          <small>{dailyPoints}</small>
        </article>
      </div>

      <h1>Latest Transactions</h1>

      <section className="transactions-card" aria-label="Latest transactions">
        {isLoading ? <p className="status-copy">Loading transactions...</p> : null}
        {error ? <p className="status-copy">{error}</p> : null}
        {!isLoading && !error
          ? latestTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          : null}
      </section>
    </section>
  );
}
