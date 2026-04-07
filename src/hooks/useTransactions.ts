import { useEffect, useState } from 'react';
import type { Transaction } from '../types';

type TransactionsState = {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
};

const transactionsUrl = `${import.meta.env.BASE_URL}data/transactions.json`;

export function useTransactions(): TransactionsState {
  const [state, setState] = useState<TransactionsState>({
    transactions: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    fetch(transactionsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load transactions.');
        }

        return response.json() as Promise<Transaction[]>;
      })
      .then((transactions) => {
        if (!isMounted) {
          return;
        }

        setState({
          transactions,
          isLoading: false,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        setState({
          transactions: [],
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unable to load transactions.',
        });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
