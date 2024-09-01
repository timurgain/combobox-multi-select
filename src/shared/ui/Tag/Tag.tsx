import { TagComponentPropsType } from '@/shared/types';
import { OptionBasicType } from '../OptionBasic/OptionBasic';
import styles from './Tag.module.scss';
import CrossIcon from '@/shared/assets/icons/circle-cross.svg?react';

export type TagType = OptionBasicType & {
  icon?: string;
  img?: string;
};

type Props = TagComponentPropsType<TagType>;

export function Tag({ option, remove }: Props) {
  const { label, img, icon } = option;

  const renderFigure = () => {
    if (img) return <img src={img} alt={`${label} image`} className={styles.img} />;
    if (icon) return <img src={icon} alt={`${label} icon`} className={styles.icon} />;
    return null;
  };

  return (
    <figure
      className={styles.figure}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {renderFigure()}

      <figcaption className={styles['caption']}>
        <p className={styles['caption__label']}>{label}</p>
      </figcaption>

      <button className={styles['remove-btn']} onClick={() => remove(option)}>
        <CrossIcon />
      </button>
    </figure>
  );
}
