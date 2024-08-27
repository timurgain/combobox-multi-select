import styles from './Input.module.scss';
import clsx from 'clsx';

export enum ImportTypes {
  TEXT = 'text',
}

export enum InputKits {
  CLEAR = 'clear',
}

type Props = {
  kit?: InputKits;
  type?: ImportTypes;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function Input({
  kit = InputKits.CLEAR,
  type = ImportTypes.TEXT,
  placeholder,
  className,
  disabled = false,
}: Props) {
  return (
    <input
      className={clsx(styles.input, styles[`input_kit_${kit}`], className)}
      type={type}
      placeholder={placeholder ?? ''}
      disabled={disabled}
    />
  );
}
