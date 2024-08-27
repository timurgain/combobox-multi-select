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
  labelFor?: string;
};

export function Input({
  kit = InputKits.CLEAR,
  type = ImportTypes.TEXT,
  placeholder,
  className,
  disabled = false,
  labelFor,
}: Props) {
  return (
    <input
      className={clsx(styles.input, styles[`input_kit_${kit}`], className)}
      id={labelFor}
      type={type}
      placeholder={placeholder ?? ''}
      disabled={disabled}
    />
  );
}
