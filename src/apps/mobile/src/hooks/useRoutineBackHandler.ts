import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { AlertUI } from '@blockit/cross-ui-toolkit';
import { router, useFocusEffect } from 'expo-router';
import { useRoutineStore } from '@blockit/ui';

export function useRoutineBackHandler() {
    const { hasDraftChanges, discardDraft } = useRoutineStore();
    
    const hasUnsavedChanges = useCallback(() => {
        // Simply check if there are draft changes
        return hasDraftChanges();
    }, [hasDraftChanges]);
    
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (hasUnsavedChanges()) {
                    AlertUI.alert(
                        'Discard Changes?',
                        'You have unsaved changes. Are you sure you want to go back and lose your progress?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Discard',
                                style: 'destructive',
                                onPress: () => {
                                    discardDraft();
                                    router.back();
                                }
                            }
                        ]
                    );
                    return true; // Prevent default back action
                }
                return false; // Let default back action happen
            };
            
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [hasUnsavedChanges, discardDraft])
    );
}