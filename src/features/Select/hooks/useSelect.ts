import { SelectBasicOption } from '@/shared/ui/OptionDefault/OptionDefault';
import { useCallback, useState } from 'react';

type Props = {
  onChange: (option: SelectBasicOption) => void;
};

export function useSelect({ onChange }: Props) {
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

  return {
    isOpen,
    toggleDropdown,
    closeDropdown,
    selectOption,
  };
}
