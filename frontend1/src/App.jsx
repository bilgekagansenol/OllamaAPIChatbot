import React, { useState, useEffect } from 'react';
import './App.css';
import ChatBox from './components/ChatBox';
import ModelSelector from './components/ModelSelector';
import Header from './components/Header';
import ChatList from './components/ChatList';

function App() {
  const [messages, setMessages] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([{ id: 1, title: 'Yeni Sohbet', messages: [] }]);
  const [activeChat, setActiveChat] = useState(1);

  // Modelleri API'den çek
  useEffect(() => {
    fetch('http://localhost:5000/api/models')
      .then(response => response.json())
      .then(data => {
        setModels(data);
        if (data.length > 0) {
          setSelectedModel(data[0]);
        }
      })
      .catch(error => console.error('Modeller yüklenirken hata:', error));
  }, []);

  // Aktif sohbet değiştiğinde mesajları güncelle
  useEffect(() => {
    const currentChat = chats.find(chat => chat.id === activeChat);
    if (currentChat) {
      setMessages(currentChat.messages);
    }
  }, [activeChat, chats]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    
    // Kullanıcı mesajını ekle
    const userMessage = { text: message, sender: 'user' };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Aktif sohbetin mesajlarını güncelle
    updateChatMessages(updatedMessages);
    
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: message,
          model: selectedModel
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Bot yanıtını ekle
        const botMessage = { text: data.response, sender: 'bot' };
        const finalMessages = [...updatedMessages, botMessage];
        setMessages(finalMessages);
        
        // Aktif sohbetin mesajlarını güncelle
        updateChatMessages(finalMessages);
        
        // İlk mesajsa sohbet başlığını güncelle
        const currentChat = chats.find(chat => chat.id === activeChat);
        if (currentChat && currentChat.title === 'Yeni Sohbet' && currentChat.messages.length === 0) {
          updateChatTitle(message.substring(0, 30) + (message.length > 30 ? '...' : ''));
        }
      } else {
        // Hata mesajını ekle
        const errorMessage = { text: `Hata: ${data.error || 'Bilinmeyen bir hata oluştu'}`, sender: 'error' };
        const finalMessages = [...updatedMessages, errorMessage];
        setMessages(finalMessages);
        
        // Aktif sohbetin mesajlarını güncelle
        updateChatMessages(finalMessages);
      }
    } catch (error) {
      const errorMessage = { text: `Bağlantı hatası: ${error.message}`, sender: 'error' };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      
      // Aktif sohbetin mesajlarını güncelle
      updateChatMessages(finalMessages);
    } finally {
      setLoading(false);
    }
  };

  const createNewChat = () => {
    const newChatId = chats.length > 0 ? Math.max(...chats.map(chat => chat.id)) + 1 : 1;
    const newChat = { id: newChatId, title: 'Yeni Sohbet', messages: [] };
    setChats([...chats, newChat]);
    setActiveChat(newChatId);
    setMessages([]);
  };

  const switchChat = (chatId) => {
    setActiveChat(chatId);
  };

  const updateChatMessages = (updatedMessages) => {
    setChats(chats.map(chat => 
      chat.id === activeChat ? { ...chat, messages: updatedMessages } : chat
    ));
  };

  const updateChatTitle = (title) => {
    setChats(chats.map(chat => 
      chat.id === activeChat ? { ...chat, title } : chat
    ));
  };

  const deleteChat = (chatId) => {
    const filteredChats = chats.filter(chat => chat.id !== chatId);
    setChats(filteredChats);
    
    if (activeChat === chatId) {
      if (filteredChats.length > 0) {
        setActiveChat(filteredChats[0].id);
        setMessages(filteredChats[0].messages);
      } else {
        createNewChat();
      }
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-container">
        <div className="sidebar">
          <button className="new-chat-btn" onClick={createNewChat}>+ Yeni Sohbet</button>
          <ChatList 
            chats={chats} 
            activeChat={activeChat} 
            onChatSelect={switchChat} 
            onChatDelete={deleteChat}
          />
        </div>
        <div className="chat-container">
          <ModelSelector 
            models={models} 
            selectedModel={selectedModel} 
            onSelectModel={setSelectedModel} 
          />
          <ChatBox 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;