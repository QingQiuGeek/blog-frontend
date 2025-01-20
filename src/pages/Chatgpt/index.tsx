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

          const readableStream = new ReadableStream({
            async start(controller) {
              let accumulatedContent = ''; // 用来累积所有内容
              let chunkBuffer = ''; // 用来缓存不完整的消息

              function push() {
                reader
                  .read()
                  .then(({ done, value }) => {
                    if (done) {
                      if (chunkBuffer.trim()) {
                        try {
                          const message = chunkBuffer
                            .trim()
                            .replace(/^data: /, '');
                          if (message !== '[DONE]') {
                            const parsed = JSON.parse(message);
                            // console.log(parsed);
                            accumulatedContent +=
                              parsed.choices[0].delta.content || '';
                            controller.enqueue(
                              encoder.encode(accumulatedContent),
                            );
                          }
                        } catch (err) {
                          console.error('Error parsing final message', err);
                        }
                      }
                      controller.close();
                      return;
                    }

                    // 将当前读取的部分数据解码为字符串
                    const chunk = decoder.decode(value, { stream: true });

                    // 将当前 chunk 与缓存中的部分内容合并
                    chunkBuffer += chunk;
                    // console.log('chunk' + chunk);

                    // console.log('chunkBuffer' + chunkBuffer);

                    // 检查是否有完整的消息
                    const splitMessages = chunkBuffer.split('\n');
                    for (let i = 0; i < splitMessages.length - 1; i++) {
                      const message = splitMessages[i]
                        .replace(/^data: /, '')
                        .trim();
                      if (message === '[DONE]') {
                        controller.close();
                        return;
                      }
                      // const str = '{"code":0,"message":"Success","sid":"cha000b1c86@dx194824b9e48b8f3532","id":"cha000b1c86@dx194824b9e48b8f3532","created":1737352782,"choices":[{"delta":{"role":"assistant","content":"需求。"},"index":0}]}';
                      // const p = JSON.parse(str);
                      try {
                        console.log(message);
                        const parsed = JSON.parse(message);
                        accumulatedContent +=
                          parsed.choices[0].delta.content || '';
                        controller.enqueue(encoder.encode(accumulatedContent));
                      } catch (err) {
                        console.error('Error parsing message:', err);
                      }
                    }
                    // 保留最后一部分不完整的消息
                    chunkBuffer = splitMessages[splitMessages.length - 1];
                    push(); // 继续读取下一部分
                  })
                  .catch((err) => {
                    console.error('读取流中的数据时发生错误', err);
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
