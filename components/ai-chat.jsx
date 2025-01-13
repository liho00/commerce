'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';

export const AIChat = () => {
  const { messages, append } = useChat({});

  useEffect(() => {
    append({
      role: 'user',
      content: `马来西亚今天阳历是${new Date().toLocaleDateString()}，请问农历是几月几号？依据今天的农历讲解节日，运气，甚至更多等等。以纯文本格式返回响应，最大标记数为 50。仅以 50 个字返回响应。`
    });
    console.log(messages);
  }, []);
  return <p className="font-[cursive] font-bold">{messages?.[1]?.content}</p>;
};
