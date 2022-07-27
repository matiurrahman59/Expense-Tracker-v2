import { useFirestore } from '../../hooks/useFirestore';

// styles
import styles from './Home.module.css';

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions');

  return (
    <ul className={styles.transactions}>
      {transactions.map(({ name, amount, id }) => (
        <li key={id}>
          <p className={styles.name}>{name}</p>
          <p className={styles.amount}>${amount}</p>
          <button onClick={() => deleteDocument(id)}>x</button>
        </li>
      ))}
    </ul>
  );
}
