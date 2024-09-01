import { Select } from '@/features/Select';
import { OptionBasicType } from '@/shared/ui/OptionBasic/OptionBasic';
import { SelectedResult } from '@/shared/ui/SelectedResult/SelectedResult';
import { useState } from 'react';

const optionsInitial = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Long long long long long label' },
  { value: '5', label: 'Option 5' },
];

export function SelectComboBox() {
  const [options, setOptions] = useState<OptionBasicType[]>(optionsInitial);
  const [value, setValue] = useState<OptionBasicType[]>([]);

  return (
    <article>
      <Select<OptionBasicType>
        title="Combobox & Multi Select & Post Option"
        isMultiple={true}
        value={value}
        postOption={(option) => {
          setOptions([...options, option]);
        }}
        options={options}
        onChange={setValue}
        hint="Hint"
      />

      <SelectedResult value={value} />
    </article>
  );
}
