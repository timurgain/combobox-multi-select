import styles from './SelectBasic.module.scss';
import { InputBox, InputBoxKits } from '@/shared/ui/InputBox/InputBox';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonKits } from '@/shared/ui/Button/Button';
import ShevronIcon from '@/shared/assets/icons/chevron-down.svg?react';

type Props = {};

export function SelectBasic({}: Props) {
  return (
    <section>
      <InputBox kit={InputBoxKits.SINGLE_SELECT}>
        <Input placeholder="Type here" />
        <Button kit={ButtonKits.CLEAR}>
          <ShevronIcon />
        </Button>
      </InputBox>
    </section>
  );
}
