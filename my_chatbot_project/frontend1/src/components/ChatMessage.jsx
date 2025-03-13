import React from 'react';

function ChatMessage({ message }) {
  return (
    <div className={`message ${message.sender}`}>
      <div className="message-content">
        <div className="message-header">
          {message.sender === 'user' ? (
            <span className="user-icon">👤</span>
          ) : message.sender === 'bot' ? (
            <span className="bot-icon">🤖</span>
          ) : (
            <span className="error-icon">⚠️</span>
          )}
          <span className="sender-name">
            {message.sender === 'user' ? 'Siz' : message.sender === 'bot' ? 'Bot' : 'Hata'}
          </span>
        </div>
        <div className="message-text">
          {message.text}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
