import { IButtonTemplate } from './ButtonTemplate';

const base: IButtonTemplate = {
  primary: true,
  size: 'text-sm',
  label: 'Button',
  style: 'text-black',
  onClick: () => alert('Hello'),
};

export const mockButtonTemplateProps = {
  base,
};
