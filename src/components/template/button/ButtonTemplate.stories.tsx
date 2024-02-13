import { Meta, StoryFn } from '@storybook/react';
import ButtonTemplate, { IButtonTemplate } from './ButtonTemplate';
import { mockButtonTemplateProps } from './ButtonTemplate.mocks';

export default {
  title: 'templates/ButtonTemplate',
  component: ButtonTemplate,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
} as Meta<typeof ButtonTemplate>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ButtonTemplate> = (args) => (
  <ButtonTemplate {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockButtonTemplateProps.base,
} as IButtonTemplate;
