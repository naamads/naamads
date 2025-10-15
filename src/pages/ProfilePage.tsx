import React from 'react';
import * as MdIcons from 'react-icons/md';
import data from '../data/profileData.json';
import { useAuth } from '../contexts/AuthContext';

type MenuItem = {
  icon: string;
  label: string;
  link: string;
  badge?: string;
  highlight?: boolean;
};

const ProfilePage: React.FC = () => {
  const { menuItems } = data;
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-8 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
              {user?.userName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {user?.userName || user?.email?.split('@')[0] || "Hello"}
            </h2>
            <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors font-medium">
              View and edit profile
            </button>
            <div className="mt-6">
              <div className="flex gap-1 justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-12 rounded-full ${
                      i < 3 ? 'bg-white' : 'bg-white/30'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-sm text-white/80">
                We are built on trust. Help one another to get to know each other better.
              </p>
            </div>
          </div>

          {/* Menu */}
          <div className="divide-y divide-border">
            {menuItems.map((item: MenuItem, index: number) => {
              const IconComponent = MdIcons[item.icon as keyof typeof MdIcons];

              return (
                <a
                  href={item.link}
                  key={index}
                  className={`flex items-center gap-4 p-4 hover:bg-muted transition-colors ${
                    item.highlight ? 'bg-accent/10' : ''
                  }`}
                >
                  <div className={`text-2xl ${item.highlight ? 'text-accent' : 'text-muted-foreground'}`}>
                    {IconComponent ? <IconComponent /> : <span>🔗</span>}
                  </div>
                  <span className={`flex-1 font-medium ${item.highlight ? 'text-accent' : ''}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
