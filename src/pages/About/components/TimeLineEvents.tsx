import { Popover, Typography } from 'antd';
import React from 'react';

interface TimeLineEventsProps {
  title: string;
  content: string;
}
const { Text } = Typography;
const TimeLineEvents: React.FC<TimeLineEventsProps> = ({ title, content }) => (
  <Popover content={content}>
    <Text code ellipsis>
      {title}
    </Text>
  </Popover>
);

export default TimeLineEvents;
