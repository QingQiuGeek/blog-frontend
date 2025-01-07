import { Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

const TextSummary = () => {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.value;
  };
  return (
    <TextArea
      showCount
      maxLength={250}
      onChange={onChange}
      placeholder="请输入文章摘要"
      style={{ height: 100, width: '100%', resize: 'none' }}
    />
  );
};

export default TextSummary;
