import clsx from 'clsx';
import styles from './OptionBasic.module.scss';

export type OptionBasicType = {
  value: string;
  label: string;
};

type Props = {
  option: OptionBasicType;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  isSelected?: boolean;
};

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
