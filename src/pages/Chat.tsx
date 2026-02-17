import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
import Footer from '../pages/footer';
import { MessageCircle, Send, Search, MoreVertical, Phone, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  product: string;
  messages: Message[];
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    avatar: 'R',
    lastMessage: 'Is this still available?',
    time: '2 min ago',
    unread: 2,
    product: 'iPhone 14 Pro Max',
    messages: [
      { id: '1', text: 'Hi, I saw your iPhone listing', sender: 'them', time: '10:30 AM' },
      { id: '2', text: 'Yes, it\'s available!', sender: 'me', time: '10:32 AM' },
      { id: '3', text: 'Is the price negotiable?', sender: 'them', time: '10:33 AM' },
      { id: '4', text: 'We can discuss. What\'s your offer?', sender: 'me', time: '10:35 AM' },
      { id: '5', text: 'Is this still available?', sender: 'them', time: '10:40 AM' },
    ]
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: 'P',
    lastMessage: 'Can you share more photos?',
    time: '1 hour ago',
    unread: 0,
    product: 'L-Shaped Sofa',
    messages: [
      { id: '1', text: 'Hello! Interested in your sofa', sender: 'them', time: '9:00 AM' },
      { id: '2', text: 'Sure, what would you like to know?', sender: 'me', time: '9:15 AM' },
      { id: '3', text: 'Can you share more photos?', sender: 'them', time: '9:20 AM' },
    ]
  },
  {
    id: '3',
    name: 'Amit Kumar',
    avatar: 'A',
    lastMessage: 'Deal done! See you tomorrow',
    time: 'Yesterday',
    unread: 0,
    product: 'Royal Enfield Classic',
    messages: [
      { id: '1', text: 'Final price ₹1,40,000?', sender: 'them', time: 'Yesterday' },
      { id: '2', text: 'Yes, that works', sender: 'me', time: 'Yesterday' },
      { id: '3', text: 'Deal done! See you tomorrow', sender: 'them', time: 'Yesterday' },
    ]
  },
];

const Chat: React.FC = () => {
  const [chats] = useState(mockChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSend = () => {
    if (newMessage.trim() && selectedChat) {
      // In a real app, this would send the message
      setNewMessage('');
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <Navbar /> */}
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg h-[calc(100vh-200px)] min-h-[500px]">
            <div className="flex h-full">
              {/* Chat List */}
              <div className={`w-full md:w-1/3 border-r border-border flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-primary" />
                    Messages
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className={`w-full p-4 flex items-start gap-3 hover:bg-muted transition-colors border-b border-border/50 ${
                          selectedChat?.id === chat.id ? 'bg-accent' : ''
                        }`}
                      >
                        <div className="w-12 h-12 gradient-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                          {chat.avatar}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-foreground truncate">{chat.name}</span>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-xs text-primary truncate mb-1">{chat.product}</p>
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            {chat.unread}
                          </span>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No conversations found
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Window */}
              <div className={`flex-1 flex flex-col ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-border flex items-center gap-3">
                      <button
                        onClick={() => setSelectedChat(null)}
                        className="md:hidden p-2 hover:bg-muted rounded-lg"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="w-10 h-10 gradient-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                        {selectedChat.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{selectedChat.name}</h3>
                        <p className="text-xs text-primary">{selectedChat.product}</p>
                      </div>
                      <button className="p-2 hover:bg-muted rounded-full">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-full">
                        <MoreVertical className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                      {selectedChat.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                              message.sender === 'me'
                                ? 'gradient-primary text-primary-foreground rounded-br-none'
                                : 'bg-card border border-border text-foreground rounded-bl-none'
                            }`}
                          >
                            <p>{message.text}</p>
                            <span className={`text-xs mt-1 block ${
                              message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {message.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-border bg-card">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                          placeholder="Type a message..."
                          className="flex-1 px-4 py-2 border border-input rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          onClick={handleSend}
                          className="p-3 gradient-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-center p-8">
                    <div>
                      <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Your Messages</h3>
                      <p className="text-muted-foreground">Select a conversation to start chatting</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
