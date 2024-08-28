import { useCallback, useState } from 'react';
import styles from './SelectBasic.module.scss';
import ShevronIcon from '@/shared/assets/icons/chevron-down.svg?react';
import { InputBox, InputBoxKits } from '@/shared/ui/InputBox/InputBox';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { InputLabel } from '@/shared/ui/InputLabel/InputLabel';
import { Dropdown, DropdownKits, DropdownProps } from '@/shared/ui/Dropdown/Dropdown';
import { OptionDefault, SelectBasicOption } from '@/shared/ui/OptionDefault/OptionDefault';

type Props = {
  value: SelectBasicOption;
  options: SelectBasicOption[];
  onChange: (option: SelectBasicOption) => void;
  CustomDropdown?: React.ComponentType<Omit<DropdownProps, 'kit'>>;
  CustomOption?: React.ComponentType;
};

export function SelectBasic({ value, options, onChange, CustomDropdown, CustomOption }: Props) {
  const DropdownComponent = CustomDropdown || Dropdown;
  const OptionComponent = CustomOption || OptionDefault;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectOption = useCallback(
    (option: SelectBasicOption) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.stopPropagation();
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
          <ShevronIcon
            style={isOpen ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}
          />
        </Button>
      </InputBox>

      <DropdownComponent kit={DropdownKits.SINGLE_SELECT} isOpen={isOpen}>
        {options.map((option) => (
          <OptionComponent key={option.value} option={option} onClick={selectOption(option)} />
        ))}
      </DropdownComponent>
    </section>
  );
}
