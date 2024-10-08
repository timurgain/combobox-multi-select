import styles from './Button.module.scss';
import clsx from 'clsx';

export enum ButtonKits {
  CLEAR = 'clear',
}

type Props = {
  kit?: ButtonKits;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  onClick,
  kit = ButtonKits.CLEAR,
  type = 'button',
  className,
  children,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(styles.button, styles[`button_kit_${kit}`], className)}
    >
      {children}
    </button>
  );
}
