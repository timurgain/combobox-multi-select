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
  style: React.CSSProperties;
  children: React.ReactNode;
};

export const DropdownDefault = forwardRef<HTMLUListElement, DropdownProps>(
  ({ kit, isOpen, style, children }, ref) => {
    return (
      <ul
        ref={ref}
        role="listbox"
        style={style}
        className={clsx(styles.dropdown, styles[`dropdown_kit_${kit}`], {
          [styles[`dropdown_open`]]: isOpen,
        })}
      >
        {children}
      </ul>
    );
  }
);
