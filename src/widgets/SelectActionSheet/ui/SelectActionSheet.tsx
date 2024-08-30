import { Select } from '@/features/Select';
import {
  OptionFigureCard,
  OptionFigureCardType,
} from '@/shared/ui/OptionFigureCard/OptionFigureCard';
import { useState } from 'react';
import LetterIcon from '@/shared/assets/icons/letter.svg';

const options = [
  { value: '1', label: 'Option 1', subtitle: 'Subtitle 1', icon: LetterIcon },
  { value: '2', label: 'Option 2', subtitle: 'Subtitle 2', icon: LetterIcon },
  { value: '3', label: 'Option 3', subtitle: 'Subtitle 3', icon: LetterIcon },
  {
    value: '4',
    label: 'Option 4',
    subtitle: 'Subtitle 4sdfsd fdsfdsfsdfdsfsdf sdf',
    icon: LetterIcon,
  },
  { value: '5', label: 'Option 5', subtitle: 'Subtitle 5', icon: LetterIcon },
  { value: '6', label: 'Option 6', subtitle: 'Subtitle 6', icon: LetterIcon },
  { value: '7', label: 'Option 7', subtitle: 'Subtitle 7', icon: LetterIcon },
  { value: '77', label: 'Option 77', subtitle: 'Subtitle 77', icon: LetterIcon },
  { value: '777', label: 'Option 777', subtitle: 'Subtitle 777', icon: LetterIcon },
];

export function SelectActionSheet() {
  const [value, setValue] = useState<OptionFigureCardType | null>(null);

  return (
    <article>
      <Select<OptionFigureCardType>
        title="Action sheet"
        isMultiple={false}
        value={value}
        options={options}
        onChange={(option) => {
          setValue(option);
        }}
        CustomOption={OptionFigureCard}
      />

      <p style={{ marginTop: '30px' }}>
        Selected: <span>{value?.label} </span>
      </p>
    </article>
  );
}
