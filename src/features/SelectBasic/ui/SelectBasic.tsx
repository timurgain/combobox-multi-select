import styles from './SelectBasic.module.scss';
import { InputBox, InputBoxKits } from '@/shared/ui/InputBox/InputBox';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { InputLabel } from '@/shared/ui/InputLabel/InputLabel';
import ShevronIcon from '@/shared/assets/icons/chevron-down.svg?react';
import { Dropdown, DropdownKits } from '@/shared/ui/Dropdown/Dropdown';
import { useCallback, useState } from 'react';
import { SelectBasicOption } from '../types/types';

type Props = {
  value: SelectBasicOption;
  options: SelectBasicOption[];
  onChange: (option: SelectBasicOption) => void;
};

export function SelectBasic({ value, options, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectOption = useCallback(
    (option: SelectBasicOption) => {
      onChange(option);
      closeDropdown();
    },
    [onChange, closeDropdown]
  );

  return (
    <section className={styles.section}>
      <InputLabel text="Title" htmlFor="select-input-basic" />

      <InputBox kit={InputBoxKits.SINGLE_SELECT} onBlur={closeDropdown} onClick={toggleDropdown}>
        <Input value={value?.label} placeholder="Type here" labelFor="select-input-basic" />
        <Button kit={ButtonKits.CLEAR}>
          <ShevronIcon />
        </Button>
      </InputBox>

      <Dropdown kit={DropdownKits.SINGLE_SELECT} isOpen={isOpen}>
        {options.map((option) => (
          <li
            key={option.value}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
            }}
          >
            {option.label}
          </li>
        ))}
      </Dropdown>
    </section>
  );
}
