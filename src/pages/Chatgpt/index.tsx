import { ProChat } from '@ant-design/pro-chat';
import { ProCard } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';

export default () => {
  const { canAdmin, canUser } = useAccess();

  // const { initialState, loading, error, refresh, setInitialState } =
  //   useModel('@@initialState');
  // console.log('initialState:' + initialState);
  // if (!canAdmin && !canUser) {
  //   message.info({
  //     content: '该功能仅供用户使用，请登录注册😐',
  //     style: {
  //       fontSize: '15px',
  //       marginTop: '8vh',
  //     },
  //   });
  // }

  return (
    <ProCard title="无问青秋" bordered hoverable subTitle="AI对话">
      <ProChat
        style={{ height: '100vh', width: '100%' }}
        helloMessage={
          '欢迎使用 青秋Chat ，这是我的CSDN博客：[CSDN](https://blog.csdn.net/qq_73181349?spm=1000.2115.3001.5343)'
        }
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
          return new Response(mockedData);
        }}
      />
    </ProCard>
  );
};
