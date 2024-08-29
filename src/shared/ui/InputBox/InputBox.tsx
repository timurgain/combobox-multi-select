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
  children: React.ReactNode;
};

export function InputBox({ kit, onClick, onBlur, children }: Props) {
  return (
    <div className={clsx(styles.box, styles[`box_kit_${kit}`])} onClick={onClick} onBlur={onBlur}>
      {children}
    </div>
  );
}
