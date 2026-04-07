export type TransactionType = 'Payment' | 'Credit';

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  name: string;
  description: string;
  date: string;
  time?: string;
  cardName?: string;
  pending: boolean;
  authorizedUser?: string;
  icon: string;
  iconBackground: string;
  rewardsPercent?: number;
};
