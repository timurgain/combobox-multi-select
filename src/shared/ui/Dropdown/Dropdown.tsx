import clsx from 'clsx';
import styles from './Dropdown.module.scss';

export enum DropdownKits {
  SINGLE_SELECT = 'single-select',
}

type Props = {
  kit?: DropdownKits;
  isOpen: boolean;
  children: React.ReactNode;
};

export function Dropdown({ kit, isOpen, children }: Props) {
  return (
    <ul
      className={clsx(styles.dropdown, styles[`dropdown_kit_${kit}`], {
        [styles[`dropdown_open`]]: isOpen,
      })}
    >
      {children}
    </ul>
  );
}
