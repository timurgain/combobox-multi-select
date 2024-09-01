import clsx from 'clsx';
import styles from './DropdownDefault.module.scss';
import { forwardRef } from 'react';

export enum DropdownKits {
  SINGLE_SELECT = 'single-select',
  MULTI_SELECT = 'multi-select',
}

export type DropdownProps = {
  kit?: DropdownKits;
  isOpen: boolean;
  children: React.ReactNode;
};

export const DropdownDefault = forwardRef<HTMLUListElement, DropdownProps>(
  ({ kit, isOpen, children }, ref) => {
    return (
      <ul
        ref={ref}
        role="listbox"
        className={clsx(styles.dropdown, styles[`dropdown_kit_${kit}`], {
          [styles[`dropdown_open`]]: isOpen,
        })}
      >
        {children}
      </ul>
    );
  }
);
