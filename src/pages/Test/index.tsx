import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import React, { useState } from 'react';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}
const options: Option[] = [
  {
    label: 'Light',
    value: 'light',
    children: new Array(20)
      .fill(null)
      .map((_, index) => ({ label: `Number ${index}`, value: index })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
          },
          {
            label: 'Toy Cards',
            value: 'cards',
          },
          {
            label: 'Toy Bird',
            value: 'bird',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const onChange: CascaderProps<Option, 'value', true>['onChange'] = (
    value,
  ) => {
    // console.log(value);
    // value = [[1]];
    // console.log('value[value.length-1]：', value[value.length - 1][1]);
    const tagId = value[value.length - 1][1];
    selectedTags.push(tagId);
    setSelectedTags(selectedTags);
    // console.log('selectedTags：', selectedTags);
  };
  return (
    <>
      <Cascader
        style={{ width: '100%' }}
        options={options}
        onChange={onChange}
        multiple
        showCheckedStrategy="SHOW_CHILD"
      />
    </>
  );
};

export default App;
