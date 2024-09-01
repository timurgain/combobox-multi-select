import styles from './TitleLabel.module.scss';
import clsx from 'clsx';

export enum TitleLabelKits {
  DEFAULT = 'default',
}

type Props = {
  kit?: TitleLabelKits;
  text: string;
  htmlFor: string;
};

export function TitleLabel({ kit = TitleLabelKits.DEFAULT, text, htmlFor }: Props) {
  return (
    <label htmlFor={htmlFor} className={clsx(styles.label, styles[`label_kit_${kit}`])}>
      <span>{text}</span>
    </label>
  );
}
