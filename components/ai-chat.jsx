'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';

export const AIChat = () => {
  const { messages, input, append } = useChat();

  useEffect(() => {
    append({
      content: '你好，我是AI，有什么可以帮助你的吗？',
      role: 'user'
    });
  }, []);
  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))
        : null}
    </div>
  );
};
