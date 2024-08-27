import styles from './MainPage.module.scss';
import { SelectBasic } from '@/widgets/SelectBasic';

export function MainPage() {
  return (
    <main className={styles.main}>
      <SelectBasic />
    </main>
  );
}
