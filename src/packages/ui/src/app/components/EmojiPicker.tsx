import React, { useState } from 'react';
import { Box, Text, Pressable, TextInput, useTheme, ScrollView } from '@blockit/cross-ui-toolkit';
import { EMOJI_CATEGORIES } from './emoji';

type EmojiPickerProps = {
  onSelect: (emoji: string) => void;
};

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState('Smileys & People');
  const [searchQuery, setSearchQuery] = useState('');
  const { currentColors } = useTheme();

  // Filter emojis based on search query and keywords
  const getFilteredEmojis = () => {
    if (!searchQuery) {
      return EMOJI_CATEGORIES[selectedCategory as keyof typeof EMOJI_CATEGORIES] || [];
    }

    const query = searchQuery.toLowerCase();
    // Search across all categories by emoji or keyword
    return Object.values(EMOJI_CATEGORIES)
      .flat()
      .filter(entry =>
        entry.emoji.includes(query) ||
        entry.keywords.some(kw => kw.includes(query))
      );
  };

  const handleEmojiSelect = (emoji: string) => {
    onSelect(emoji);
  };

  return (
    <Box className="rounded-xl p-4 max-h-[400px] flex flex-col" style={{ backgroundColor: currentColors.surface.card }}>
      {/* Header with research note */}
      <Box className='mb-3'>
        <Text variant="h6" style={{ color: currentColors.text.main, marginBottom: 4 }}>
          Choose an Emoji
        </Text>
      </Box>

      {/* Search Input */}
      <TextInput 
        style={{ width: '100%', marginBottom: 12}}
        placeholder="Search emojis..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Category Tabs */}
      {!searchQuery && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 12, minHeight: 40 }}
        >
          <Box className='flex flex-row min-h-6' style={{ gap: 7 }}>
            {Object.keys(EMOJI_CATEGORIES).map((category) => (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={{
                  backgroundColor: selectedCategory === category
                    ? currentColors.primary[400]
                    : currentColors.surface.card
                }}
                className={`px-3 py-1.5 rounded-2xl`}
              >
                <Text
                  variant="caption"
                  className=' text-nowrap'
                  style={{
                    color: currentColors.text.main,
                    fontWeight: selectedCategory === category ? '600' : '400'
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </Box>
        </ScrollView>
      )}

      {/* Emoji Grid */}
      <ScrollView className='h-96'>
        <Box className="flex flex-row flex-wrap w-full" style={{ gap: 6 }}>
          {getFilteredEmojis().map((entry, index) => (
            <Pressable
              key={`${entry.emoji}-${index}`}
              onPress={() => handleEmojiSelect(entry.emoji)}
              className="rounded-xl bg-transparent select-none w-12 h-12 flex items-center justify-center"
              hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
            >
              <Text style={{ fontSize: 32, lineHeight: 40, textAlign: 'center' }}>
                {entry.emoji}
              </Text>
            </Pressable>
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
}