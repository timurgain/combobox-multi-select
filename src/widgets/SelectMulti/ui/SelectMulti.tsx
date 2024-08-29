import { Select } from '@/features/Select';
import { useState } from 'react';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Option 6' },
  { value: '7', label: 'Option 7' },
  { value: '77', label: 'Option 77' },
  { value: '777', label: 'Option 777' },
];

export function SelectMulti() {
  const [value, setValue] = useState<typeof options>([]);

  return (
    <article>
      <Select<(typeof options)[0]>
        isMultiple={true}
        value={value}
        options={options}
        onChange={(option) => {
          setValue(option);
        }}
      />
      <p style={{ marginTop: '30px' }}>
        Selected:{' '}
        {value.map((v) => (
          <span key={v.value}>{v.label} </span>
        ))}
      </p>
    </article>
  );
}
