import { OptionBasicType } from '@/shared/ui/OptionBasic/OptionBasic';
import { debounce } from '@/shared/utils';
import { useCallback, useEffect, useState } from 'react';

type Props<T extends OptionBasicType> = {
  value: T | T[];
  options: T[];
  isMultiple?: boolean;
  handleChange: (option: T | T[]) => void;
};

export function useSelectComponent<T extends OptionBasicType>({
  value,
  options,
  isMultiple,
  handleChange,
}: Props<T>) {
  const FILTER_OPTIONS_DELEAY = 200;
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [placeholderValue, setPlaceholderValue] = useState(
    !Array.isArray(value) ? value.label : ''
  );
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const filterOptionsDebounced = debounce(
      () =>
        setFilteredOptions(
          options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
        ),
      FILTER_OPTIONS_DELEAY
    );
    filterOptionsDebounced(inputValue);
  }, [inputValue, options]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectOption = useCallback(
    (option: T, value: T | T[]) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.stopPropagation();

      if (!isMultiple && !Array.isArray(value)) {
        handleChange(option);
        setPlaceholderValue(option.label);
      }
      if (isMultiple && Array.isArray(value)) {
        const newValue = value.some((v) => v.value === option.value)
          ? value.filter((v) => v.value !== option.value)
          : [...value, option];
        handleChange(newValue);
      }
      closeDropdown();
      setInputValue('');
    },
    [isMultiple, handleChange, closeDropdown]
  );

  const isOptionSelected = useCallback(
    (option: T, value: T | T[]) => {
      if (!isMultiple && !Array.isArray(value)) return value.value === option.value;
      if (isMultiple && Array.isArray(value)) return value.some((v) => v.value === option.value);
    },
    [isMultiple]
  );

  return {
    isOpen,
    inputValue,
    handleInputChange,
    placeholderValue,
    filteredOptions,
    toggleDropdown,
    closeDropdown,
    selectOption,
    isOptionSelected,
  };
}
