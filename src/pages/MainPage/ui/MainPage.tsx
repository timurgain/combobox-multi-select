import { SelectMulti } from '@/widgets/SelectMulti/ui/SelectMulti';
import styles from './MainPage.module.scss';
import { SelectBasic } from '@/widgets/SelectBasic';

export function MainPage() {
  return (
    <main className={styles.main}>
      <SelectBasic />
      <SelectMulti />
    </main>
  );
}
