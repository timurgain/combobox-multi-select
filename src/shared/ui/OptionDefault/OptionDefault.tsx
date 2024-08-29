import clsx from 'clsx';
import styles from './OptionDefault.module.scss';

export type SelectBasicOption = {
  value: string | number;
  label: string;
};

type Props = {
  option: SelectBasicOption;
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
