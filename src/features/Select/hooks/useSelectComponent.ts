import { OptionBasicType } from '@/shared/ui/OptionBasic/OptionBasic';
import { debounce } from '@/shared/utils';
import { useCallback, useEffect, useState } from 'react';

type Props<T extends OptionBasicType> = {
  value: T | T[] | null;
  options: T[];
  optionRefs: React.MutableRefObject<HTMLElement[]>;
  isMultiple?: boolean;
  updSelected: (option: T | T[]) => void;
  postOption?: (option: T) => void;
  externalError?: string;
};

export function useSelectComponent<T extends OptionBasicType>({
  value,
  options,
  optionRefs,
  isMultiple,
  updSelected,
  postOption,
  externalError,
}: Props<T>) {
  const FILTER_OPTIONS_DELEAY = 200;
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [error, setError] = useState<string | null>(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(null);
  const [placeholderValue, setPlaceholderValue] = useState(
    !Array.isArray(value) ? value?.label : ''
  );

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
    if (!filteredOptions.length && !postOption) setIsOpen(false);
  }, [filteredOptions, postOption]);

  useEffect(() => {
    if (focusedOptionIndex !== null && optionRefs.current[focusedOptionIndex]) {
      optionRefs.current[focusedOptionIndex].scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [focusedOptionIndex, optionRefs]);

  useEffect(() => {
    setFocusedOptionIndex(null);
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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // if (!isOpen) return;
      switch (e.key) {
        case 'ArrowDown':
          setFocusedOptionIndex((prevIndex) =>
            prevIndex === null || prevIndex === filteredOptions.length - 1 ? 0 : prevIndex + 1
          );
          break;

        case 'ArrowUp':
          setFocusedOptionIndex((prevIndex) =>
            prevIndex === null || prevIndex === 0 ? filteredOptions.length - 1 : prevIndex - 1
          );
          break;

        case 'Enter':
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          if (focusedOptionIndex !== null && filteredOptions[focusedOptionIndex]) {
            toggleSelection(filteredOptions[focusedOptionIndex]);
            closeDropdown();
            setInputValue('');
          }
          if (!filteredOptions.length && inputValue) {
            createOption(inputValue);
            closeDropdown();
          }
          break;

        case 'Escape':
          closeDropdown();
          break;

        default:
          break;
      }
    },
    [
      isOpen,
      focusedOptionIndex,
      filteredOptions,
      inputValue,
      closeDropdown,
      toggleSelection,
      createOption,
    ]
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
    focusedOptionIndex,
    handleOptionClick,
    isOptionSelected,
    createOption,
    handleKeyDown,
    error,
  };
}
