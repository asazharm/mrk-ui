import CalendarWidget from '../components/CalendarWidget/CalendarWidget';

export default {
  title: 'Component/UI/CalendarWidget',
  component: CalendarWidget,
};

const Template = (arg: any) => <CalendarWidget {...arg} />;
export const CalendarWidgetStory = Template.bind({});
