import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
import Footer from '../pages/footer';
import { Bell, Check, Trash2, MessageCircle, Heart, Tag, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'like' | 'price' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'message', title: 'New message from Rahul', description: 'Hi, is the iPhone still available?', time: '5 min ago', read: false },
  { id: '2', type: 'like', title: 'Someone liked your ad', description: 'Your "Maruti Swift" ad got a new favorite', time: '1 hour ago', read: false },
  { id: '3', type: 'price', title: 'Price drop alert', description: 'Honda City you saved dropped to ₹7.5L', time: '2 hours ago', read: false },
  { id: '4', type: 'system', title: 'Complete your profile', description: 'Add a phone number for faster responses', time: '1 day ago', read: true },
  { id: '5', type: 'message', title: 'New message from Priya', description: 'Can you share more photos of the furniture?', time: '2 days ago', read: true },
  { id: '6', type: 'like', title: 'Your ad is popular!', description: '10 people saved your MacBook listing', time: '3 days ago', read: true },
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-5 h-5 text-primary" />;
      case 'like': return <Heart className="w-5 h-5 text-heart" />;
      case 'price': return <Tag className="w-5 h-5 text-success" />;
      case 'system': return <AlertCircle className="w-5 h-5 text-warning" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Check className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-card border rounded-xl p-4 transition-all hover:shadow-md ${
                    notification.read ? 'border-border' : 'border-primary/50 bg-accent/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/10'}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={`font-semibold text-foreground ${!notification.read && 'text-primary'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs text-destructive hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">No notifications</h2>
                <p className="text-muted-foreground">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;
