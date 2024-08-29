import { Select } from '@/features/Select';
import { useState } from 'react';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

export function SelectBasic() {
  const [value, setValue] = useState<(typeof options)[0]>(options[0]);

  return (
    <article>
      <Select<(typeof options)[0]>
        isMultiple={false}
        value={value}
        options={options}
        onChange={(option) => {
          setValue(option);
        }}
      />
      <p style={{ marginTop: '30px' }}>Selected: {value.label}</p>
    </article>
  );
}
