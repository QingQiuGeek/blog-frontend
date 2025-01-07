// import 'bytemd/dist/index.css';
// import './index.css';

//byteMd
// export default () => {
//   return (
//     <ProCard>
//       <MyEditor></MyEditor>
//       <Divider></Divider>
//       <Operation></Operation>
//       <FloatButton.BackTop />
//     </ProCard>
//   );
// };

//mdEditorRT
import { ProCard } from '@ant-design/pro-components';

import { FloatButton } from 'antd';

import { useState } from 'react';
import MdEditorRT from './components/mdEditorRT';
import Operation from './components/operations/operation';
import Title from './components/Title';

export default () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  // const editPassage = useSelector((state: any) => state.editPassage);
  // useEffect(() => {
  //   if (
  //     editPassage.title.trim().length !== 0 &&
  //     editPassage.content.trim().length !== 0
  //   )
  //     setTitle(editPassage.title);
  //   setContent(editPassage.content);
  // }, [editPassage]);

  return (
    <ProCard>
      <Title handleTitle={setTitle}></Title>
      <MdEditorRT handleContentProps={setContent}></MdEditorRT>
      <Operation getTitle={title} getContent={content}></Operation>
      <FloatButton.BackTop />
    </ProCard>
  );
};
