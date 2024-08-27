import styles from './InputLabel.module.scss';
import clsx from 'clsx';

export enum InputLabelKits {
  DEFAULT = 'default',
}

type Props = {
  kit?: InputLabelKits;
  text: string;
  htmlFor: string;
};

export function InputLabel({ kit = InputLabelKits.DEFAULT, text, htmlFor }: Props) {
  return (
    <label htmlFor={htmlFor} className={clsx(styles.label, styles[`label_kit_${kit}`])}>
      <span>{text}</span>
    </label>
  );
}
