import clsx from 'clsx';
import styles from './OptionBasic.module.scss';
import { OptionComponentPropsType } from '@/shared/types';

export type OptionBasicType = {
  value: string;
  label: string;
};

type Props = OptionComponentPropsType<OptionBasicType>;

export function OptionBasic({ option, onClick, isSelected }: Props) {
  return (
    <li
      onClick={onClick}
      className={clsx(styles.option, { [styles['option_selected']]: isSelected })}
    >
      <p className={styles['option__label']}>{option.label}</p>
    </li>
  );
}
