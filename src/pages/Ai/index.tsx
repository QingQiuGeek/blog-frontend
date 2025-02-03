import { modelDomain } from '@/constants/AI';
import { ProChat } from '@ant-design/pro-chat';
import { ProCard } from '@ant-design/pro-components';
export default () => {
  return (
    <ProCard title="青秋AI" bordered hoverable>
      <ProChat
        style={{ height: '80vh', width: '100%' }}
        helloMessage={
          '欢迎使用 青秋AI ，这是我的博客：[CSDN](https://blog.csdn.net/qq_73181349)'
        }
        // https://spark-api-open.xf-yun.com/v1/chat/completions
        // /ai/v1/chat/completions
        request={async (messages) => {
          const response = await fetch('/ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Authorization: 'Bearer uoaIRTZjqIAeqOKqVnkQ:wqxCyYGCwOpBxsZIQozf',
            },
            body: JSON.stringify({
              model: modelDomain,
              messages: messages,
              stream: true,
            }),
          });
          //这个message是发出去的消息
          // console.log('messages', messages);

          // 确保服务器响应是成功的
          if (!response.ok || !response.body) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // 获取 reader
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          const encoder = new TextEncoder();
          let jsonBuffer = '';
          const readableStream = new ReadableStream({
            async start(controller) {
              // let accumulatedContent = ''; // 用来累积所有内容
              // let chunkBuffer = ''; // 用来缓存不完整的消息

              function push() {
                reader
                  .read()
                  .then(({ done, value }) => {
                    if (done) {
                      controller.close();
                      // console.log('数据流解析-------- 连接关闭');
                      return;
                    }
                    // 1、流返回的块数据
                    const chunk = decoder.decode(value, { stream: true });
                    // console.log('数据流解析-------- 当前返回块', chunk);
                    // 2、更新到缓存区
                    jsonBuffer += chunk;
                    // 3、尝试分片解析json
                    let boundaryIndex = 0;
                    // 当前片内容
                    while ((boundaryIndex = jsonBuffer.indexOf('\n')) >= 0) {
                      // 3.1 数据块切片
                      const jsonString = jsonBuffer.slice(0, boundaryIndex);
                      // 3.2 更新缓存区
                      jsonBuffer = jsonBuffer.slice(boundaryIndex + 2);
                      // console.log(
                      //   '数据流解析-------- 缓存区剩余数据',
                      //   jsonBuffer,
                      // );
                      try {
                        const jsonStr = jsonString.replace('data:', '');
                        // console.log(
                        //   '数据流解析-------- 将要解析的json字符串',
                        //   jsonStr,
                        // );
                        if (jsonStr === '[DONE]') {
                          return;
                        }
                        const jsonObject = JSON.parse(jsonStr); // 解析 JSON
                        // console.log(
                        //   '数据流解析-------- json字符串转换为对象',
                        //   jsonObject,
                        // );

                        // 处理可识别内容 - 伪代码，根据实际对象处理
                        const content = jsonObject.choices[0].delta.content;
                        controller.enqueue(encoder.encode(content));
                        // 解析结束 - 我们业务是根据此字段标识，根据实际情况调整
                        if (jsonObject.choices[1].index === 0) {
                          // console.log('数据流解析-------- 解析数据流结束');
                          // 清空缓存区
                          jsonBuffer = '';
                          break;
                        }
                      } catch (error) {
                        console.log('数据流解析-------- json解析出错', error);
                      }
                    }

                    // 处理缓冲区中剩余的数据（这里冗余设计，可以考虑去掉，只是为了观察每块数据的不完整json串）
                    if (jsonBuffer) {
                      console.log(
                        '数据流解析-------- 缓存区剩余内容',
                        jsonBuffer,
                      );
                      try {
                        const jsonObject = JSON.parse(jsonBuffer);
                        console.log('缓存区剩余内容：解析成功', jsonObject);
                      } catch (error) {
                        console.log(
                          '数据流解析-------- 处理缓存区剩余内容出错，可能需要等待下一块流数据，缓存区剩余数据',
                          jsonBuffer,
                        );
                      }
                    }
                    push();
                  })
                  .catch((err) => {
                    console.log(
                      '数据流解析-------- 读取流中的数据时发生错误',
                      err,
                    );
                    controller.error(err);
                  });
              }
              push();
            },
          });
          return new Response(readableStream);
        }}
      />
    </ProCard>
  );
};
