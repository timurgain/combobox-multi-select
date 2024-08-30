import styles from './Select.module.scss';
import ShevronIcon from '@/shared/assets/icons/chevron-down.svg?react';
import SearchIcon from '@/shared/assets/icons/search.svg?react';
import { InputBox, InputBoxKits } from '@/shared/ui/InputBox/InputBox';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { DropdownDefault, DropdownKits } from '@/shared/ui/DropdownDefault/DropdownDefault';
import { OptionBasic, OptionBasicType } from '@/shared/ui/OptionBasic/OptionBasic';
import { useSelectComponent } from '../hooks/useSelectComponent';
import { TitleLabel } from '@/shared/ui/InputLabel/TitleLabel';
import { SelectProps } from '../types';

export function Select<T extends OptionBasicType>({
  title,
  isMultiple,
  value,
  options,
  onChange,
  CustomDropdown,
  CustomOption,
}: SelectProps<T>) {
  const Dropdown = CustomDropdown || DropdownDefault;
  const Option = CustomOption || OptionBasic;
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
      <TitleLabel text={title} htmlFor="select-input-basic" />

      <InputBox
        kit={isMultiple ? InputBoxKits.MULTI_SELECT : InputBoxKits.SINGLE_SELECT}
        onBlur={closeDropdown}
        onClick={toggleDropdown}
      >
        {isMultiple && Array.isArray(value) && value.length < 1 && <SearchIcon />}

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
