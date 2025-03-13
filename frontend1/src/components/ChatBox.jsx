import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

function ChatBox({ messages, onSendMessage, loading }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  // Otomatik kaydırma
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading && input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chatbox">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>Sohbete başlamak için bir mesaj gönderin</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))
        )}
        {loading && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sorunuzu buraya yazın..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Gönder
        </button>
      </form>
    </div>
  );
}

export default ChatBox; 