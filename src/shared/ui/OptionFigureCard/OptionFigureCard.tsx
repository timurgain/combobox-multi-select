import clsx from 'clsx';
import styles from './OptionFigureCard.module.scss';
import CheckboxIcon from '@/shared/assets/icons/checkbox-list.svg?react';
import { OptionBasicType } from '../OptionBasic/OptionBasic';
import { OptionComponentPropsType } from '@/shared/types';

export type OptionFigureCardType = OptionBasicType & {
  icon?: string;
  img?: string;
  subtitle?: string;
};

type Props = OptionComponentPropsType<OptionFigureCardType>;

export function OptionFigureCard({ option, onClick, isSelected }: Props) {
  const { label, img, icon, subtitle } = option;

  const renderFigure = () => {
    if (img) return <img src={img} alt={`${label} image`} className={styles.img} />;
    if (icon) return <img src={icon} alt={`${label} icon`} className={styles.icon} />;
    return null;
  };

  return (
    <li
      onClick={onClick}
      className={clsx(styles.option, { [styles['option_selected']]: isSelected })}
    >
      <figure className={styles.figure}>
        {renderFigure()}
        <figcaption className={styles.caption}>
          <p className={styles['caption__label']}>{label}</p>
          <p className={styles['caption__subtitle']}>{subtitle}</p>
        </figcaption>
      </figure>

      {isSelected && <CheckboxIcon className={styles.mark} />}
    </li>
  );
}
