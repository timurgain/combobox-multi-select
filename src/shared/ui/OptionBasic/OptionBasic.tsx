import clsx from 'clsx';
import styles from './OptionBasic.module.scss';
import { OptionComponentPropsType } from '@/shared/types';
import { forwardRef } from 'react';

export type OptionBasicType = {
  value: string;
  label: string;
};

type Props = OptionComponentPropsType<OptionBasicType>;

export const OptionBasic = forwardRef<HTMLLIElement, Props>(
  ({ option, onClick, isSelected, isFocused }, ref) => {
    return (
      <li
        ref={ref}
        role="option"
        aria-selected={isSelected}
        onClick={onClick}
        className={clsx(
          styles.option,
          { [styles['option_selected']]: isSelected },
          { [styles['option_focused']]: isFocused }
        )}
      >
        <p className={styles['option__label']}>{option.label}</p>
      </li>
    );
  }
);
