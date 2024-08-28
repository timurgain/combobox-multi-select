import styles from './OptionDefault.module.scss';

export type SelectBasicOption = {
  value: string | number;
  label: string;
};

type Props = {
  option: SelectBasicOption;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

export function OptionDefault({ option, onClick }: Props) {
  return (
    <li onClick={onClick} className={styles.option}>
      <p className={styles['option__label']}>{option.label}</p>
    </li>
  );
}
