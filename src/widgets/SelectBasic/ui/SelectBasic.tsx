import { Select } from '@/features/Select';
import { ContainerDemo } from '@/shared/ui/ContainerDemo/ContainerDemo';
import { OptionBasicType } from '@/shared/ui/OptionBasic/OptionBasic';
import { SelectedResult } from '@/shared/ui/SelectedResult/SelectedResult';
import { useState } from 'react';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

export function SelectBasic() {
  const [value, setValue] = useState<OptionBasicType>(options[0]);

  return (
    <ContainerDemo>
      <Select<OptionBasicType>
        title="Select Basic"
        isMultiple={false}
        value={value}
        options={options}
        onChange={setValue}
        hint="Hint"
      />

      <SelectedResult value={value} />
    </ContainerDemo>
  );
}
