import { OptionComponentPropsType } from '@/shared/types';
import { DropdownProps } from '@/shared/ui/DropdownDefault/DropdownDefault';

export type SingleProps<T> = {
  title: string;
  isMultiple?: false;
  value: T | null;
  options: T[];
  onChange: (option: T) => void;
  CustomDropdown?: React.ComponentType<Omit<DropdownProps, 'kit'>>;
  CustomOption?: React.ComponentType<OptionComponentPropsType<T>>;
};

export type MultiProps<T> = {
  title: string;
  isMultiple: true;
  value: T[] | null;
  options: T[];
  onChange: (option: T[]) => void;
  CustomDropdown?: React.ComponentType<Omit<DropdownProps, 'kit'>>;
  CustomOption?: React.ComponentType<OptionComponentPropsType<T>>;
};

export type SelectProps<T> = SingleProps<T> | MultiProps<T>;
