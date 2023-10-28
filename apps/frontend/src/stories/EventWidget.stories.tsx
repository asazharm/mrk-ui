import EventWidget from '../components/EventWidget/EventWidget';

export default {
  title: 'Component/UI/EventWidget',
  component: EventWidget,
};

const Template = (arg: any) => <EventWidget {...arg} />;
export const EventWidgetStory = Template.bind({});
