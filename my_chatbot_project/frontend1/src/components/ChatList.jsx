import React from 'react';

function ChatList({ chats, activeChat, onChatSelect, onChatDelete }) {
  return (
    <div className="chat-list">
      {chats.map(chat => (
        <div 
          key={chat.id} 
          className={`chat-item ${chat.id === activeChat ? 'active' : ''}`}
          onClick={() => onChatSelect(chat.id)}
        >
          <span className="chat-title">{chat.title}</span>
          <button 
            className="delete-chat-btn"
            onClick={(e) => {
              e.stopPropagation();
              onChatDelete(chat.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default ChatList; 