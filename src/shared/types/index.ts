export type OptionComponentPropsType<T> = {
  option: T;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  isSelected?: boolean;
};
