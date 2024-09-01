import { OptionComponentPropsType, TagComponentPropsType } from '@/shared/types';
import { DropdownProps } from '@/shared/ui/DropdownDefault/DropdownDefault';

export type SingleProps<T> = {
  title: string;
  isMultiple?: false;
  isDisabled?: boolean;
  value: T | null;
  options: T[];
  hint?: string;
  externalError?: string;
  postOption?: (option: T) => void;
  onChange: (option: T) => void;
  CustomTag?: React.ComponentType<TagComponentPropsType<T>>;
  CustomOption?: React.ComponentType<OptionComponentPropsType<T>>;
  CustomDropdown?: React.ComponentType<Omit<DropdownProps, 'kit'>>;
};

export type MultiProps<T> = {
  title: string;
  isMultiple: true;
  isDisabled?: boolean;
  value: T[] | null;
  options: T[];
  hint?: string;
  externalError?: string;
  postOption?: (option: T) => void;
  onChange: (option: T[]) => void;
  CustomTag?: React.ComponentType<TagComponentPropsType<T>>;
  CustomOption?: React.ComponentType<OptionComponentPropsType<T>>;
  CustomDropdown?: React.ComponentType<Omit<DropdownProps, 'kit'>>;
};

export type SelectProps<T> = SingleProps<T> | MultiProps<T>;
