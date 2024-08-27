import styles from './InputBox.module.scss';
import clsx from 'clsx';

export enum InputBoxKits {
  SINGLE_SELECT = 'single-select',
}

type Props = {
  kit?: InputBoxKits;
  children: React.ReactNode;
};

export function InputBox({ kit, children }: Props) {
  return <div className={clsx(styles.box, styles[`box_kit_${kit}`])}>{children}</div>;
}
