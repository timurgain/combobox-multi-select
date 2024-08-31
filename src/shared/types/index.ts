export type OptionComponentPropsType<T> = {
  option: T;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  isSelected?: boolean;
};

export type TagComponentPropsType<T> = {
  option: T;
  remove: (option: T) => void;
};
