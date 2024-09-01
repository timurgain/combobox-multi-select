import styles from './MainPage.module.scss';
import { SelectBasic } from '@/widgets/SelectBasic';
import { SelectActionSheet } from '@/widgets/SelectActionSheet';
import { SelectMulti } from '@/widgets/SelectMulti';
import { SelectComboBox } from '@/widgets/SelectComboBox';

export function MainPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.main__title}>Custom Select & Multi Select & Combobox demo</h1>
      <p className={styles.main__subtitle}>Scroll to test a Dropdown position</p>
      <div className={styles['main__content']}>
        <SelectBasic />
        <SelectActionSheet />
        <SelectMulti />
        <SelectComboBox />
      </div>
    </main>
  );
}
