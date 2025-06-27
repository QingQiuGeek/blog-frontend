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
        request={async (messages: any) => {
          try {
            console.log('messages', messages);

            // 1. 提取最后一条用户消息并正确编码
            const userMessage = messages[messages.length - 1]?.content || '';
            const encodedMsg = encodeURIComponent(userMessage);

            // 2. 构建 SSE URL - 注意使用 Flux 的端点
            const url = `/api/ai/chat/flux?msg=${encodedMsg}`;
            console.log('Connecting to SSE URL:', url);

            // 3. 使用 EventSource 连接 SSE
            const eventSource = new EventSource(url);

            // 4. 创建可读流
            const readableStream = new ReadableStream({
              start(controller) {
                let isClosed = false;

                // 监听消息事件
                eventSource.onmessage = (event) => {
                  try {
                    console.log('Received SSE data:', event.data);

                    // 检查空数据
                    if (!event.data || event.data.trim() === '') return;

                    // Flux 通常直接返回文本内容，不需要 JSON 解析
                    controller.enqueue(new TextEncoder().encode(event.data));
                  } catch (error) {
                    console.error('SSE 数据处理错误:', error);
                  }
                };

                // 监听错误事件
                eventSource.onerror = (error) => {
                  console.error('SSE 连接错误:', error);
                  if (!isClosed) {
                    // 当错误发生时关闭流
                    controller.close();
                    isClosed = true;
                    eventSource.close();
                  }
                };

                // 监听打开事件（可选）
                eventSource.onopen = () => {
                  console.log('SSE 连接已建立');
                };

                // 设置超时作为后备关闭机制
                const timeoutId = setTimeout(() => {
                  if (!isClosed) {
                    console.warn('SSE 超时关闭');
                    controller.close();
                    isClosed = true;
                    eventSource.close();
                  }
                }, 30000); // 30秒超时

                // 清理函数
                const cleanup = () => {
                  clearTimeout(timeoutId);
                  eventSource.close();
                  console.log('SSE 连接已清理');
                };

                // 存储清理函数以便取消时调用
                this.cleanup = cleanup;
              },

              // 取消请求时的清理逻辑
              cancel() {
                console.log('SSE 流被取消');
                if (this.cleanup) {
                  this.cleanup();
                }
              },
            });

            return new Response(readableStream);
          } catch (error) {
            console.error('请求初始化失败:', error);
            return new Response(
              JSON.stringify({
                error: 'SSE 连接失败',
                details: error.message,
              }),
              {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
              },
            );
          }
        }}
        // request={async (messages) => {
        //   // 获取最后一条用户消息
        //   const lastMessage = messages[messages.length - 1];
        //   // 创建 AbortController 用于中断请求
        //   const abortController = new AbortController();

        //   const response = await fetch(
        //     `/api/ai/chat/sse?msg=${encodeURIComponent(lastMessage.content)}`,
        //     {
        //       method: 'GET',
        //       signal: abortController.signal,
        //       headers: {
        //         'Content-Type': 'text/event-stream; charset=utf-8',
        //         'Cache-Control': 'no-cache',
        //         Connection: 'keep-alive',
        //       },
        //     },
        //   );

        //   // console.log('response :', response);
        //   if (!response.ok || !response.body) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        //   }

        //   const reader = response.body.getReader();
        //   const decoder = new TextDecoder('utf-8');
        //   let buffer = ''; // 新增：缓冲区用于处理跨 chunk 的 UTF-8 字符

        //   return new ReadableStream({
        //     async start(controller) {
        //       try {
        //         while (true) {
        //           const { done, value } = await reader.read();
        //           if (done) break;

        //           // 关键修复：使用 stream: true 处理不完整字符
        //           buffer += decoder.decode(value, { stream: true });

        //           // 处理完整的 SSE 事件块
        //           let eventEnd;
        //           while ((eventEnd = buffer.indexOf('\n\n')) >= 0) {
        //             const eventBlock = buffer.slice(0, eventEnd);
        //             console.log('eventEnd: ', eventEnd);
        //             buffer = buffer.slice(eventEnd + 2); // 保留未处理数据
        //             console.log('buffer: ', buffer);

        //             // 解析事件内容（关键：不再过滤任何字符）
        //             eventBlock.split('\n').forEach((line) => {
        //               if (line.startsWith('data:')) {
        //                 const content = line.slice(5).trim();
        //                 controller.enqueue(new TextEncoder().encode(content));
        //               }
        //             });
        //           }
        //         }

        //         // 处理最后可能残留的数据
        //         if (buffer.trim().length > 0) {
        //           controller.enqueue(new TextEncoder().encode(buffer));
        //         }
        //       } catch (err) {
        //         controller.error(err);
        //       } finally {
        //         controller.close();
        //         reader.releaseLock();
        //       }
        //     },
        //     cancel() {
        //       abortController.abort();
        //     },
        //   });
        // }}
      />
    </ProCard>
  );
};
