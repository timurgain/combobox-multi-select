import { OptionBasicType } from '@/shared/ui/OptionBasic/OptionBasic';
import { debounce } from '@/shared/utils';
import { useCallback, useEffect, useState } from 'react';

type Props<T extends OptionBasicType> = {
  value: T | T[] | null;
  options: T[];
  isMultiple?: boolean;
  updSelected: (option: T | T[]) => void;
  postOption?: (option: T) => void;
};

export function useSelectComponent<T extends OptionBasicType>({
  value,
  options,
  isMultiple,
  updSelected,
  postOption,
}: Props<T>) {
  const FILTER_OPTIONS_DELEAY = 200;
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [placeholderValue, setPlaceholderValue] = useState(
    !Array.isArray(value) ? value?.label : ''
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

  const toggleSelection = useCallback(
    (option: T) => {
      if (!isMultiple && !Array.isArray(value)) {
        updSelected(option);
        setPlaceholderValue(option.label);
      }

      if (isMultiple && Array.isArray(value)) {
        const newValue = value.some((v) => v.value === option.value)
          ? value.filter((v) => v.value !== option.value)
          : [...value, option];
        updSelected(newValue);
      }
    },
    [updSelected, isMultiple, value]
  );

  const handleOptionClick = useCallback(
    (option: T) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.stopPropagation();
      toggleSelection(option);
      closeDropdown();
      setInputValue('');
    },
    [toggleSelection, closeDropdown]
  );

  const isOptionSelected = useCallback(
    (option: T) => {
      if (!isMultiple && !Array.isArray(value)) return value?.value === option.value;
      if (isMultiple && Array.isArray(value)) return value.some((v) => v.value === option.value);
    },
    [isMultiple, value]
  );

  const createOption = useCallback(
    (inputValue: string) => {
      if (!postOption) return;
      const newOption = {
        value: inputValue,
        label: inputValue,
      } as T;
      postOption(newOption);
      toggleSelection(newOption);
      setInputValue('');
    },
    [postOption, toggleSelection]
  );

  return {
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
  };
}
