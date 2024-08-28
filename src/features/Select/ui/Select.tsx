import styles from './Select.module.scss';
import ShevronIcon from '@/shared/assets/icons/chevron-down.svg?react';
import { InputBox, InputBoxKits } from '@/shared/ui/InputBox/InputBox';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import { InputLabel } from '@/shared/ui/InputLabel/InputLabel';
import {
  DropdownDefault,
  DropdownKits,
  DropdownProps,
} from '@/shared/ui/DropdownDefault/DropdownDefault';
import { OptionDefault, SelectBasicOption } from '@/shared/ui/OptionDefault/OptionDefault';
import { useSelect } from '../hooks/useSelect';

type Props = {
  value: SelectBasicOption;
  options: SelectBasicOption[];
  onChange: (option: SelectBasicOption) => void;
  CustomDropdown?: React.ComponentType<Omit<DropdownProps, 'kit'>>;
  CustomOption?: React.ComponentType;
};

export function Select({ value, options, onChange, CustomDropdown, CustomOption }: Props) {
  const Dropdown = CustomDropdown || DropdownDefault;
  const Option = CustomOption || OptionDefault;

  const { isOpen, toggleDropdown, closeDropdown, selectOption } = useSelect({ onChange });

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

      <Dropdown kit={DropdownKits.SINGLE_SELECT} isOpen={isOpen}>
        {options.map((option) => (
          <Option key={option.value} option={option} onClick={selectOption(option)} />
        ))}
      </Dropdown>
    </section>
  );
}
