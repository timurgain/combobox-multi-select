import { SelectBasic } from '@/features/SelectBasic';
import { SelectBasicOption } from '@/shared/ui/OptionDefault/OptionDefault';
import { useState } from 'react';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

export function SelectBasicDemo() {
  const [option, setOption] = useState<SelectBasicOption>(options[0]);

  return (
    <>
      <SelectBasic
        value={option}
        options={options}
        onChange={(option: SelectBasicOption) => {
          setOption(option);
        }}
      />
      <p style={{ marginTop: '30px' }}>Selected: {option.label}</p>
    </>
  );
}
