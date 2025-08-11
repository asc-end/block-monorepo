import { Box, Button, NumberInput, Text, TextInput, Toggle, useTheme } from '@blockit/cross-ui-toolkit';
import { useState } from 'react';
import { useRoutineStore } from '../../../stores/routineStore';

export function RoutineMoney({ onBack }: { onBack: () => void }) {
    const { currentColors } = useTheme();
    const { stakeAmount, setStakeAmount } = useRoutineStore();
    const [localStakeAmount, setLocalStakeAmount] = useState<number | undefined>(stakeAmount);
    const [isEnabled, setIsEnabled] = useState(stakeAmount !== undefined && stakeAmount > 0);
    const freeText = "Build the habit. No pressure attached."
    const stakeText = "You'll lose your stake if you fail."

    const handleSave = () => {
        console.log('Save button clicked', { isEnabled, localStakeAmount });
        if (isEnabled) {
            setStakeAmount(localStakeAmount);
        } else {
            setStakeAmount(undefined);
        }
        onBack();
    }

    return (
        <Box className="flex-1 flex flex-col" style={{ backgroundColor: currentColors.surface.card }}>
            {/* Scrollable Content */}
            <Box className="flex-1 px-4">
                <Box className="flex flex-row p-4">
                    <Box className="flex flex-col" style={{ gap: 8 }}>
                        <Text variant="h2">Skin in the Game</Text>
                        <Text variant="caption">Stakes add real consequences to your challenges</Text>
                    </Box>
                    <Toggle
                        value={isEnabled}
                        onValueChange={setIsEnabled}
                        size="lg"
                    />
                </Box>
                <Box className="flex flex-row w-full h-28 items-center px-4">
                    {isEnabled && (
                        <NumberInput
                            className="w-full flex-1"
                            placeholder="Enter your stake amount"
                            value={localStakeAmount}
                            onChangeNumber={(value) => setLocalStakeAmount(value || 0)}
                            step={0.01}
                            min={0}
                        />
                    )}
                </Box>

                <Box className="flex-1 flex flex-col items-center justify-center">
                    <Text variant="h3" className="text-center text-5xl font-bold" style={{ color: currentColors.text.soft + '40' }}>{isEnabled ? stakeText : freeText}</Text>
                </Box>
            </Box>

            {/* Fixed Bottom Button */}
            <Box className="px-4 pb-8 pt-2">
                <Button className='w-full' title="Save" onPress={handleSave} disabled={!localStakeAmount && isEnabled}/>
            </Box>
        </Box>
    );
}