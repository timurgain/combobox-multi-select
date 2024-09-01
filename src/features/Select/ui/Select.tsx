import styles from './Select.module.scss';
import ShevronIcon from '@/shared/assets/icons/chevron-down.svg?react';
import SearchIcon from '@/shared/assets/icons/search.svg?react';
import AddIcon from '@/shared/assets/icons/add-on.svg?react';
import { InputBox, InputBoxKits } from '@/shared/ui/InputBox/InputBox';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { DropdownDefault, DropdownKits } from '@/shared/ui/DropdownDefault/DropdownDefault';
import { OptionBasic, OptionBasicType } from '@/shared/ui/OptionBasic/OptionBasic';
import { useSelectComponent } from '../hooks/useSelectComponent';
import { TitleLabel } from '@/shared/ui/InputLabel/TitleLabel';
import { SelectProps } from '../types';
import { Tag as TagDefault } from '@/shared/ui/Tag/Tag';
import clsx from 'clsx';
import { useRef } from 'react';
import { useDropdownPosition } from '../hooks/useDropdownPosition';

export function Select<T extends OptionBasicType>({
  title,
  isMultiple,
  isDisabled,
  value,
  options,
  externalError,
  hint,
  postOption,
  onChange,
  CustomTag,
  CustomOption,
  CustomDropdown,
}: SelectProps<T>) {
  const Tag = CustomTag || TagDefault;
  const Option = CustomOption || OptionBasic;
  const Dropdown = CustomDropdown || DropdownDefault;

  const optionRefs = useRef<HTMLElement[]>([]);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputBoxRef = useRef<HTMLDivElement>(null);

  const updSelected = (option: T | T[]) =>
    isMultiple ? onChange(option as T[]) : onChange(option as T);

  const {
    isOpen,
    inputValue,
    handleInputChange,
    placeholderValue,
    filteredOptions,
    toggleSelection,
    toggleDropdown,
    closeDropdown,
    handleOptionClick,
    focusedOptionIndex,
    isOptionSelected,
    createOption,
    handleKeyDown,
    error,
  } = useSelectComponent<T>({
    value,
    options,
    optionRefs,
    isMultiple,
    updSelected,
    postOption,
    externalError,
  });

  const { dropdownStyles } = useDropdownPosition({ isOpen, inputBoxRef, dropdownRef });

  const hintMsg = () => {
    const msg = error || hint;
    if (isOpen || !msg) return;
    return (
      <p className={clsx({ [styles['hint-text']]: !!hint }, { [styles['error-text']]: !!error })}>
        {msg}
      </p>
    );
  };

  return (
    <section className={styles.section}>
      <TitleLabel text={title} htmlFor={title.replace(' ', '-').toLowerCase()} />

      <InputBox
        ref={inputBoxRef}
        kit={isMultiple ? InputBoxKits.MULTI_SELECT : InputBoxKits.SINGLE_SELECT}
        onBlur={closeDropdown}
        onClick={toggleDropdown}
        isError={!!error}
        isDisabled={isDisabled}
        isDropdownOpen={isOpen}
      >
        {isMultiple && Array.isArray(value) && value.length < 1 && <SearchIcon />}

        {isMultiple &&
          value?.map((v) => <Tag key={v.value} option={v} remove={() => toggleSelection(v)} />)}

        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder={placeholderValue}
          labelFor={title.replace(' ', '-').toLowerCase()}
          disabled={isDisabled}
        />

        {!isMultiple && (
          <Button kit={ButtonKits.CLEAR}>
            <ShevronIcon
              style={isOpen ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}
            />
          </Button>
        )}

        {hintMsg()}
      </InputBox>

      <Dropdown
        kit={isMultiple ? DropdownKits.MULTI_SELECT : DropdownKits.SINGLE_SELECT}
        isOpen={isOpen}
        ref={dropdownRef}
        style={dropdownStyles}
      >
        {filteredOptions.map((option, index) => (
          <Option
            ref={(element: HTMLLIElement) => {
              optionRefs.current[index] = element;
            }}
            key={option.value}
            option={option}
            onClick={handleOptionClick(option)}
            isSelected={isOptionSelected(option)}
            isFocused={focusedOptionIndex === index}
          />
        ))}

        {!filteredOptions.length && postOption && inputValue && (
          <Button
            kit={ButtonKits.CLEAR}
            className={styles['add-on']}
            onClick={() => createOption(inputValue)}
          >
            <AddIcon />
            <p>Создать «{inputValue}»</p>
          </Button>
        )}
      </Dropdown>
    </section>
  );
}
