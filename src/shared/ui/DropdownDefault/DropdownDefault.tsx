import clsx from 'clsx';
import styles from './DropdownDefault.module.scss';

export enum DropdownKits {
  SINGLE_SELECT = 'single-select',
}

export type DropdownProps = {
  kit?: DropdownKits;
  isOpen: boolean;
  children: React.ReactNode;
};

export function DropdownDefault({ kit, isOpen, children }: DropdownProps) {
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
