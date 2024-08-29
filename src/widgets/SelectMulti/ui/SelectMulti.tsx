import { Select } from '@/features/Select';
import { SelectBasicOption } from '@/shared/ui/OptionDefault/OptionDefault';
import { useState } from 'react';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

export function SelectMulti() {
  const [value, setValue] = useState<SelectBasicOption[]>([]);

  return (
    <article>
      <Select
        isMultiple={true}
        value={value}
        options={options}
        onChange={(option: SelectBasicOption[]) => {
          setValue(option);
        }}
      />
      <p style={{ marginTop: '30px' }}>
        Selected:{' '}
        {value.map((v) => (
          <span>{v.label}</span>
        ))}
      </p>
    </article>
  );
}
