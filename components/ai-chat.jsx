'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';

export const AIChat = () => {
  const { messages, input, append } = useChat({
    // initialMessages: [
    //   {
    //     role: 'user',
    //     content: `马来西亚今天阳历是${new Date().toLocaleDateString()}，请问农历是几月几号？依据今天的农历讲解节日，运气，甚至更多等等。`
    //   },
    //   {
    //     role: 'assistant',
    //     content: '以纯文本格式返回响应，最大标记数为 100。仅以 100 个字返回响应。'
    //   }
    // ]
  });

  useEffect(() => {
    append({
      role: 'user',
      content: `马来西亚今天阳历是${new Date().toLocaleDateString()}，请问农历是几月几号？依据今天的农历讲解节日，运气，甚至更多等等。以纯文本格式返回响应，最大标记数为 100。仅以 100 个字返回响应。`
    });
  }, []);
  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages?.[1]?.content}
    </div>
  );
};
