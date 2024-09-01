import { OptionBasicType } from '../OptionBasic/OptionBasic';
import styles from './SelectedResult.module.scss';

type Props<T extends OptionBasicType> = {
  value: T | T[] | null;
};

export function SelectedResult<T extends OptionBasicType>({ value }: Props<T>) {
  return (
    <section className={styles.section}>
      <p>Selected:</p>
      {Array.isArray(value) ? (
        value.map((v) => (
          <p key={v.value} className={styles.option}>
            {v.label}
          </p>
        ))
      ) : (
        <p className={styles.option}>{value?.label}</p>
      )}
    </section>
  );
}
