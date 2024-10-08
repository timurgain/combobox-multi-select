import { forwardRef } from 'react';
import styles from './InputBox.module.scss';
import clsx from 'clsx';

export enum InputBoxKits {
  SINGLE_SELECT = 'single-select',
  MULTI_SELECT = 'multi-select',
}

type Props = {
  kit?: InputBoxKits;
  onClick?: () => void;
  onBlur?: () => void;
  isError?: boolean;
  isDisabled?: boolean;
  isDropdownOpen?: boolean;
  children: React.ReactNode;
};

export const InputBox = forwardRef<HTMLDivElement, Props>(
  ({ kit, onClick, onBlur, isError, isDisabled, isDropdownOpen, children }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.box,
          styles[`box_kit_${kit}`],
          { [styles[`box_error`]]: isError },
          { [styles[`box_disabled`]]: isDisabled },
          { [styles[`box_active`]]: isDropdownOpen }
        )}
        onClick={onClick}
        onBlur={onBlur}
      >
        {children}
      </div>
    );
  }
);
