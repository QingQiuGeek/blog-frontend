import { getCategoriesAndTagsUsingGet } from '@/services/blog/categoryController';
import { Cascader, CascaderProps, message } from 'antd';
import React, { useState } from 'react';

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}
interface SelectTagsProps {
  onTagsChange: (tags: number[]) => void; // 父组件传递的回调函数
  isDisable: boolean;
}
const SelectTags: React.FC<SelectTagsProps> = ({ onTagsChange, isDisable }) => {
  const [options, setOptions] = useState<Option[]>();
  const [loadTag, setLoadTag] = useState<boolean>();
  const [selectedTags, setSelectedTags] = useState([]);

  const loadData = async (visible: boolean) => {
    if (visible) {
      setLoadTag(true);
      try {
        const res: API.BaseResponseListCategoryAndTags_ =
          await getCategoriesAndTagsUsingGet();
        if (res) {
          // console.log(stringify(res));
          const convertedOptions = res.map((category) => {
            // 将 category 转换为 Option
            const categoryOption: Option = {
              value: category.categoryId ?? '',
              label: category.categoryName ?? '',
              // 3. 将 tagVOList 转换为 children
              children: category.tagVOList?.map((tag) => ({
                value: tag.tagId ?? '',
                label: tag.tagName ?? '',
              })),
            };
            return categoryOption;
          });
          // 4. 设置到 state
          setOptions(convertedOptions);
        } else {
          message.error('标签加载失败');
        }
      } catch (error) {
        message.error('标签加载异常:' + error);
      }
      setLoadTag(false);
    }
  };
  const onChange: CascaderProps<Option, 'value', true>['onChange'] = (
    value,
  ) => {
    // console.log(value);
    if (value.length === 4) {
      message.error('最多选择3个标签！');
      return;
    }
    // console.log(value);
    const tagsId = value.map((item) => item[1]);
    setSelectedTags(value);
    onTagsChange(tagsId);
  };

  return (
    <>
      <Cascader
        disabled={isDisable}
        key="interestTag"
        options={options}
        onDropdownVisibleChange={loadData}
        expandTrigger="hover"
        loading={loadTag}
        onChange={onChange}
        multiple
        value={selectedTags}
        showCheckedStrategy="SHOW_CHILD"
      />
    </>
  );
};

export default SelectTags;
