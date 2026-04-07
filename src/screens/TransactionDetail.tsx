import { Link, useParams } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency, formatTransactionDetailDate } from '../utils/formatters';

const FALLBACK_CARD_NAME = 'RBC Bank Debit Card';

export function TransactionDetail() {
  const { transactionId } = useParams();
  const { transactions, isLoading, error } = useTransactions();
  const transaction = transactions.find((item) => item.id === transactionId);

  if (isLoading) {
    return <DetailFrame status="Loading transaction..." />;
  }

  if (error) {
    return <DetailFrame status={error} />;
  }

  if (!transaction) {
    return <DetailFrame status="Transaction not found." />;
  }

  return (
    <section className="screen detail-screen">
      <Link className="back-link" to="/transactions" aria-label="Back to transactions">
        ‹
      </Link>

      <header className="detail-hero">
        <h1>{formatCurrency(transaction.amount)}</h1>
        <p>{transaction.name}</p>
        <time dateTime={transaction.date}>
          {formatTransactionDetailDate(transaction.date, transaction.time)}
        </time>
      </header>

      <section className="detail-card" aria-label="Transaction details">
        <div className="detail-status">
          <strong>Status: {transaction.pending ? 'Pending' : 'Approved'}</strong>
          <span>{transaction.cardName ?? FALLBACK_CARD_NAME}</span>
        </div>
        <DetailRow label="Total" value={formatCurrency(transaction.amount)} />
      </section>
    </section>
  );
}

function DetailFrame({ status }: { status: string }) {
  return (
    <section className="screen detail-screen">
      <Link className="back-link" to="/transactions" aria-label="Back to transactions">
        ‹
      </Link>
      <p className="status-copy">{status}</p>
    </section>
  );
}

function DetailRow({ label, value }: TransactionDetailRow) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

type TransactionDetailRow = {
  label: string;
  value: string;
};
