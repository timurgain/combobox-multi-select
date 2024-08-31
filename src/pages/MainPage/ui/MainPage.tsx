import { SelectMulti } from '@/widgets/SelectMulti/ui/SelectMulti';
import styles from './MainPage.module.scss';
import { SelectBasic } from '@/widgets/SelectBasic';
import { SelectActionSheet } from '@/widgets/SelectActionSheet';
import { SelectComboBox } from '@/widgets/SelectComboBox/ui/SelectComboBox';

export function MainPage() {
  return (
    <main className={styles.main}>
      <SelectBasic />
      <SelectActionSheet />
      <SelectMulti />
      <SelectComboBox />
    </main>
  );
}
