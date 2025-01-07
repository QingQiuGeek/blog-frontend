import { Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

interface HandleSummaryProps {
  onSummaryChange: (summary: string) => void;
  isDisable: boolean;
}

const TextSummary: React.FC<HandleSummaryProps> = ({
  onSummaryChange,
  isDisable,
}) => {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onSummaryChange(e.target.value);
  };
  return (
    <TextArea
      showCount
      maxLength={250}
      disabled={isDisable}
      onChange={onChange}
      placeholder="请输入文章摘要"
      style={{ height: 100, width: '100%', resize: 'none' }}
    />
  );
};

export default TextSummary;
