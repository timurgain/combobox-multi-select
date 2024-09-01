import { OptionBasicType } from '@/shared/ui/OptionBasic/OptionBasic';
import { debounce } from '@/shared/utils';
import { useCallback, useEffect, useState } from 'react';

type Props<T extends OptionBasicType> = {
  value: T | T[] | null;
  options: T[];
  isMultiple?: boolean;
  updSelected: (option: T | T[]) => void;
  postOption?: (option: T) => void;
  externalError?: string;
};

export function useSelectComponent<T extends OptionBasicType>({
  value,
  options,
  isMultiple,
  updSelected,
  postOption,
  externalError,
}: Props<T>) {
  const FILTER_OPTIONS_DELEAY = 200;
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [placeholderValue, setPlaceholderValue] = useState(
    !Array.isArray(value) ? value?.label : ''
  );
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (externalError) {
      setError(externalError);
    } else if (inputValue && !filteredOptions.length && !postOption) {
      setError('No matches found');
    } else {
      setError(null);
    }
  }, [inputValue, filteredOptions, externalError, postOption]);

  useEffect(() => {
    if (!filteredOptions.length) setIsOpen(false);
  }, [filteredOptions]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInputValue(value);
      if (filteredOptions.length) setIsOpen(true);
    },
    [filteredOptions]
  );

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
    error,
  };
}
