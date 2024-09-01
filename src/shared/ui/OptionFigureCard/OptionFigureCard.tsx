import clsx from 'clsx';
import styles from './OptionFigureCard.module.scss';
import CheckboxIcon from '@/shared/assets/icons/checkbox-list.svg?react';
import { OptionBasicType } from '../OptionBasic/OptionBasic';
import { OptionComponentPropsType } from '@/shared/types';
import { forwardRef } from 'react';

export type OptionFigureCardType = OptionBasicType & {
  icon?: string;
  img?: string;
  subtitle?: string;
};

type Props = OptionComponentPropsType<OptionFigureCardType>;

export const OptionFigureCard = forwardRef<HTMLLIElement, Props>(
  ({ option, onClick, isSelected, isFocused }, ref) => {
    const { label, img, icon, subtitle } = option;

    const renderFigure = () => {
      if (img) return <img src={img} alt={`${label} image`} className={styles.img} />;
      if (icon) return <img src={icon} alt={`${label} icon`} className={styles.icon} />;
      return null;
    };

    return (
      <li
        ref={ref}
        role="option"
        aria-selected={isSelected}
        onClick={onClick}
        className={clsx(
          styles.option,
          { [styles['option_selected']]: isSelected },
          { [styles['option_focused']]: isFocused }
        )}
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
);
