import { Outlet } from 'react-router-dom';
import { TransactionDetail } from './screens/TransactionDetail';
import { TransactionsList } from './screens/TransactionsList';

function WalletShell() {
  return (
    <main className="page-shell" aria-label="Wallet application">
      <Outlet />
    </main>
  );
}

export const App = Object.assign(WalletShell, {
  TransactionsList,
  TransactionDetail,
});
