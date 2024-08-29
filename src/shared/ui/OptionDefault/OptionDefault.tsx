import clsx from 'clsx';
import styles from './OptionDefault.module.scss';

export type BasicOption = {
  value: string;
  label: string;
};

type Props = {
  option: BasicOption;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  isSelected?: boolean;
};

export function OptionDefault({ option, onClick, isSelected }: Props) {
  return (
    <li
      onClick={onClick}
      className={clsx(styles.option, { [styles['option_selected']]: isSelected })}
    >
      <p className={styles['option__label']}>{option.label}</p>
    </li>
  );
}
