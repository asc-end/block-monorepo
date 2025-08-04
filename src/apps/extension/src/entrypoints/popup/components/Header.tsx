import React from 'react';
import { Box, Text, useTheme } from '@blockit/cross-ui-toolkit';

interface HeaderProps {
  title: string;
  rightElement?: React.ReactNode;
}

export function Header({ title, rightElement }: HeaderProps) {
  const { currentColors } = useTheme();

  return (
    <Box
      className="flex flex-row items-center justify-between px-4 py-3 border-b"
      style={{
        backgroundColor: currentColors.background,
        borderBottomColor: currentColors.neutral[200] + '20',
        minHeight: '56px',
      }}
    >
      <Text variant="h4" style={{ fontWeight: '600', fontFamily: 'ClashDisplay' }}>
        {title}
      </Text>
      {rightElement && (
        <Box className="flex items-center" style={{ color: currentColors.text.soft }}>
          {rightElement}
        </Box>
      )}
    </Box>
  );
}