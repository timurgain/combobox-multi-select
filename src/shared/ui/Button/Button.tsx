import styles from './Button.module.scss';
import clsx from 'clsx';

export enum ButtonKits {
  CLEAR = 'clear',
}

type Props = {
  kit?: ButtonKits;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
};

export function Button({ kit = ButtonKits.CLEAR, type = 'button', children }: Props) {
  return (
    <button type={type} className={clsx(styles.button, styles[`button_kit_${kit}`])}>
      {children}
    </button>
  );
}
