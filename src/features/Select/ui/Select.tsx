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

export function Select<T extends OptionBasicType>({
  title,
  isMultiple,
  value,
  options,
  postOption,
  onChange,
  CustomTag,
  CustomOption,
  CustomDropdown,
}: SelectProps<T>) {
  const Tag = CustomTag || TagDefault;
  const Option = CustomOption || OptionBasic;
  const Dropdown = CustomDropdown || DropdownDefault;

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
    isOptionSelected,
    createOption,
  } = useSelectComponent<T>({ value, options, isMultiple, updSelected, postOption });

  return (
    <section className={styles.section}>
      <TitleLabel text={title} htmlFor={title.replace(' ', '-').toLowerCase()} />

      <InputBox
        kit={isMultiple ? InputBoxKits.MULTI_SELECT : InputBoxKits.SINGLE_SELECT}
        onBlur={closeDropdown}
        onClick={toggleDropdown}
      >
        {isMultiple && Array.isArray(value) && value.length < 1 && <SearchIcon />}

        {isMultiple ? (
          <>
            {value?.map((v) => <Tag key={v.value} option={v} remove={() => toggleSelection(v)} />)}

            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type here"
              labelFor={title.replace(' ', '-').toLowerCase()}
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
            onClick={handleOptionClick(option)}
            isSelected={isOptionSelected(option)}
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

        {!filteredOptions.length && !postOption && inputValue && (
          <div className={styles['add-on']}>
            <p>Не найдено «{inputValue}»</p>
          </div>
        )}
      </Dropdown>
    </section>
  );
}
