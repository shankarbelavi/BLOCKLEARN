import React from 'react';

const Message = ({ message, isUser }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isUser
          ? 'bg-primary text-white rounded-br-none'
          : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-slate-100 rounded-bl-none'
      }`}>
        <p className="text-sm">{message.message}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-white/70' : 'text-gray-500 dark:text-slate-400'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default Message;
