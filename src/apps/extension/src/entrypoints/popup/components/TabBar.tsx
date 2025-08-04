import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Pressable, useTheme } from '@blockit/cross-ui-toolkit';

interface TabItem {
  id: string;
  path: string;
  icon: React.ReactNode;
}

export function TabBar() {
  const { currentColors } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs: TabItem[] = [
    {
      id: 'history',
      path: '/history',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: 'home',
      path: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'stats',
      path: '/stats',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Box
      className="fixed bottom-0 left-0 right-0 flex flex-row justify-around items-center h-16 border-t"
      style={{
        backgroundColor: currentColors.surface.card,
        borderTopColor: currentColors.neutral[200] + '20',
        zIndex: 50,
      }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.path);
        return (
          <Pressable
            key={tab.id}
            onPress={() => navigate(tab.path)}
            className="flex-1 flex items-center justify-center h-full"
          >
            <Box
              className="p-2 rounded-lg"
              style={{
                color: active ? currentColors.primary[500] : currentColors.text.soft,
              }}
            >
              {tab.icon}
            </Box>
          </Pressable>
        );
      })}
    </Box>
  );
}