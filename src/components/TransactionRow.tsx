import { Link } from 'react-router-dom';
import { TransactionIcon } from './TransactionIcon';
import type { Transaction } from '../types';
import { formatTransactionAmount, formatTransactionMeta } from '../utils/formatters';

type TransactionRowProps = {
  transaction: Transaction;
};

export function TransactionRow({ transaction }: TransactionRowProps) {
  const { descriptionLine, detailLine } = formatTransactionMeta(transaction);

  return (
    <Link className="transaction-row" to={`/transactions/${transaction.id}`}>
      <TransactionIcon
        icon={transaction.icon}
        background={transaction.iconBackground}
        label={transaction.name}
      />
      <span className="transaction-copy">
        <strong>{transaction.name}</strong>
        <span>{descriptionLine}</span>
        <span>{detailLine}</span>
      </span>
      <span className="transaction-side">
        <strong>{formatTransactionAmount(transaction)}</strong>
        {transaction.rewardsPercent ? (
          <span className="reward-pill">{transaction.rewardsPercent}%</span>
        ) : null}
      </span>
      <span className="chevron" aria-hidden="true">
        ›
      </span>
    </Link>
  );
}
