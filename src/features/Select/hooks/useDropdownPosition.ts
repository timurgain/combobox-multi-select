import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  inputBoxRef: React.RefObject<HTMLDivElement>;
  dropdownRef: React.RefObject<HTMLUListElement>;
};

export function useDropdownPosition({ isOpen, inputBoxRef, dropdownRef }: Props) {
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (inputBoxRef.current && dropdownRef.current && isOpen) {
      const offset = 8;
      const inputBoxRect = inputBoxRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = dropdownRef.current.offsetHeight;

      const shouldRenderAbove = inputBoxRect.bottom + dropdownHeight > viewportHeight;

      setDropdownStyles({
        position: 'absolute',
        top: shouldRenderAbove
          ? `${inputBoxRect.top - dropdownHeight - offset}px`
          : `${inputBoxRect.bottom + offset}px`,
        left: `${inputBoxRect.left}px`,
        width: `${inputBoxRect.width}px`,
      });
    }
  }, [dropdownRef, inputBoxRef, isOpen]);

  return { dropdownStyles };
}
