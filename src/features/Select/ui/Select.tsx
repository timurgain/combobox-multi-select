import styles from './Select.module.scss';
import ShevronIcon from '@/shared/assets/icons/chevron-down.svg?react';
import SearchIcon from '@/shared/assets/icons/search.svg?react';
import { InputBox, InputBoxKits } from '@/shared/ui/InputBox/InputBox';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { InputLabel } from '@/shared/ui/InputLabel/InputLabel';
import {
  DropdownDefault,
  DropdownKits,
  DropdownProps,
} from '@/shared/ui/DropdownDefault/DropdownDefault';
import { BasicOption, OptionDefault } from '@/shared/ui/OptionDefault/OptionDefault';
import { useSelectComponent } from '../hooks/useSelectComponent';

type SingleProps<T> = {
  isMultiple?: false;
  value: T;
  options: T[];
  onChange: (option: T) => void;
  CustomDropdown?: React.ComponentType<Omit<DropdownProps, 'kit'>>;
  CustomOption?: React.ComponentType;
};

type MultiProps<T> = {
  isMultiple: true;
  value: T[];
  options: T[];
  onChange: (option: T[]) => void;
  CustomDropdown?: React.ComponentType<Omit<DropdownProps, 'kit'>>;
  CustomOption?: React.ComponentType;
};

type Props<T> = SingleProps<T> | MultiProps<T>;

export function Select<T extends BasicOption>({
  isMultiple,
  value,
  options,
  onChange,
  CustomDropdown,
  CustomOption,
}: Props<T>) {
  const Dropdown = CustomDropdown || DropdownDefault;
  const Option = CustomOption || OptionDefault;
  const handleChange = (option: T | T[]) =>
    isMultiple ? onChange(option as T[]) : onChange(option as T);

  const {
    isOpen,
    inputValue,
    handleInputChange,
    placeholderValue,
    filteredOptions,
    toggleDropdown,
    closeDropdown,
    selectOption,
    isOptionSelected,
  } = useSelectComponent<T>({ value, options, isMultiple, handleChange });

  return (
    <section className={styles.section}>
      <InputLabel text="Title" htmlFor="select-input-basic" />

      <InputBox
        kit={isMultiple ? InputBoxKits.MULTI_SELECT : InputBoxKits.SINGLE_SELECT}
        onBlur={closeDropdown}
        onClick={toggleDropdown}
      >
        {isMultiple && value.length < 1 && <SearchIcon />}

        {isMultiple ? (
          <>
            {value?.map((v) => <span key={v.value}>{v.label}</span>)}
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type here"
              labelFor="select-input-basic"
            />
          </>
        ) : (
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholderValue}
            labelFor="select-input-basic"
          />
        )}

        {!isMultiple && (
          <Button kit={ButtonKits.CLEAR}>
            <ShevronIcon
              style={isOpen ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}
            />
          </Button>
        )}
      </InputBox>

      <Dropdown kit={DropdownKits.SINGLE_SELECT} isOpen={isOpen}>
        {filteredOptions.map((option) => (
          <Option
            key={option.value}
            option={option}
            onClick={selectOption(option, value)}
            isSelected={isOptionSelected(option, value)}
          />
        ))}
      </Dropdown>
    </section>
  );
}
