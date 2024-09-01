import styles from './ContainerDemo.module.scss';

type Props = {
  children: React.ReactNode;
};

export function ContainerDemo({ children }: Props) {
  return <article className={styles.demo}>{children}</article>;
}
