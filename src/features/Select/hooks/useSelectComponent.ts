import { useCallback, useState } from 'react';

interface BasicOption {
  value: string | number;
  label: string;
}

type Props<T extends BasicOption, IsMultiple extends boolean> = {
  isMultiple?: IsMultiple;
  handleChange: (option: T | T[]) => void;
};

export function useSelectComponent<T extends BasicOption, IsMultiple extends boolean>({
  isMultiple,
  handleChange,
}: Props<T, IsMultiple>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectOption = useCallback(
    (option: T, value: T | T[]) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.stopPropagation();

      if (!isMultiple && !Array.isArray(value)) handleChange(option);
      if (isMultiple && Array.isArray(value)) {
        const newValue = value.some((v) => v.value === option.value)
          ? value.filter((v) => v.value !== option.value)
          : [...value, option];
        handleChange(newValue);
      }
      closeDropdown();
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
    toggleDropdown,
    closeDropdown,
    selectOption,
    isOptionSelected,
  };
}
