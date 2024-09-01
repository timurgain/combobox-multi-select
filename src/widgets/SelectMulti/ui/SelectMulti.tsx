import { Select } from '@/features/Select';
import {
  OptionFigureCard,
  OptionFigureCardType,
} from '@/shared/ui/OptionFigureCard/OptionFigureCard';
import { useState } from 'react';
import avatar from '@/shared/assets/images/avatar.png';
import { Tag as TagFigureCard } from '@/shared/ui/Tag/Tag';
import { SelectedResult } from '@/shared/ui/SelectedResult/SelectedResult';

const options = [
  { value: '1', label: 'Куликов И.', subtitle: 'Subtitle 1', img: avatar },
  { value: '2', label: 'Кузнецов В.', subtitle: 'Subtitle 2', img: avatar },
  { value: '3', label: 'Алексеев-Сахаров дель Монтессори.', subtitle: 'Subtitle 3', img: avatar },
  {
    value: '4',
    label: 'Макаров Д.',
    subtitle: 'Long long very long long long subtitle',
    img: avatar,
  },
  { value: '5', label: 'Сидоров Е.', subtitle: 'Subtitle 5', img: avatar },
  { value: '6', label: 'Петров Ф.', subtitle: 'Subtitle 6', img: avatar },
  { value: '7', label: 'Иванов Г.', subtitle: 'Subtitle 7', img: avatar },
  { value: '77', label: 'Сергеев И.', subtitle: 'Subtitle 77', img: avatar },
  { value: '777', label: 'Антонов К.', subtitle: 'Subtitle 777', img: avatar },
];

export function SelectMulti() {
  const [value, setValue] = useState<OptionFigureCardType[]>([]);

  return (
    <article>
      <Select<OptionFigureCardType>
        title="Multi Select"
        isMultiple={true}
        value={value}
        options={options}
        onChange={setValue}
        CustomTag={TagFigureCard}
        CustomOption={OptionFigureCard}
      />

      <SelectedResult value={value} />
    </article>
  );
}
