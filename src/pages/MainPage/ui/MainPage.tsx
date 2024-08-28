import styles from './MainPage.module.scss';
import { SelectBasicDemo } from '@/widgets/SelectBasicDemo';

export function MainPage() {
  return (
    <main className={styles.main}>
      <SelectBasicDemo />
    </main>
  );
}
