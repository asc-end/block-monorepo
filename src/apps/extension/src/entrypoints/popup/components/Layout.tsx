import React from 'react';
import { Box } from '@blockit/cross-ui-toolkit';
import { TabBar } from './TabBar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showTabBar?: boolean;
  headerTitle?: string;
  headerRightElement?: React.ReactNode;
}

export function Layout({ children, showTabBar = true, headerTitle, headerRightElement }: LayoutProps) {
  return (
    <Box className="flex flex-col h-full w-full">
      {headerTitle && (
        <Header title={headerTitle} rightElement={headerRightElement} />
      )}
      <Box 
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: showTabBar ? '64px' : '0' }}
      >
        {children}
      </Box>
      {showTabBar && <TabBar />}
    </Box>
  );
}