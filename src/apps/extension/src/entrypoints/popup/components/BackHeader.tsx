import { Text, useTheme, Alert } from "@blockit/cross-ui-toolkit";
import { ChevronIcon } from "@blockit/ui";
import { useRoutineStore } from "@blockit/ui";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useCallback, Fragment, useEffect } from "react";

interface BackHeaderProps {
    title?: string;
}

export function BackHeader({ title }: BackHeaderProps = {}) {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentColors } = useTheme();
    const [showConfirmAlert, setShowConfirmAlert] = React.useState(false);
    const { blockedApps, endDate, stakeAmount, timeSettings, resetRoutineState } = useRoutineStore();
    
    // Debug effect to monitor alert state
    useEffect(() => {
        console.log('Alert state changed:', showConfirmAlert);
    }, [showConfirmAlert]);
  
    // Map route paths to display names
    const routeNames: Record<string, string> = {
      '/stats': 'Stats',
      '/': 'Home',
    };
  
    // Get the current route name, fallback to path if not mapped
    const routeName = title || routeNames[location.pathname] || location.pathname.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Check if we're in the create routine flow
    const isInCreateRoutineFlow = location.pathname.includes('/create-routine');
    
    // Check if there are unsaved changes
    const hasUnsavedChanges = useCallback(() => {
        // Default values from routineStore
        const defaultDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        const defaultStartTime = '00:00';
        const defaultEndTime = '23:59';
        const defaultDuration = 60;
        
        // Check if time settings have been modified from defaults
        const hasTimeSettings = (
            timeSettings.timeMode === 'blocking' ? 
                // For blocking mode, check if times are different from defaults
                (timeSettings.startTime !== defaultStartTime || timeSettings.endTime !== defaultEndTime) : 
            timeSettings.timeMode === 'limit' ?
                // For limit mode, check if duration is different from default
                timeSettings.duration !== defaultDuration :
                false
        );
        
        // Check if selected days are different from default (all days selected)
        const hasModifiedDays = timeSettings.selectedDays.length !== defaultDays.length ||
            !timeSettings.selectedDays.every(day => defaultDays.includes(day));
        
        // Only check for time settings, end date, and blocked apps (not stake amount)
        return blockedApps.length > 0 || 
               endDate !== null || 
               hasTimeSettings ||
               hasModifiedDays;
    }, [blockedApps, endDate, timeSettings]);
    
    const handleBackClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Back button clicked');
        console.log('Location:', location.pathname);
        console.log('isInCreateRoutineFlow:', isInCreateRoutineFlow);
        console.log('hasUnsavedChanges:', hasUnsavedChanges());
        console.log('blockedApps length:', blockedApps.length);
        console.log('endDate:', endDate);
        console.log('stakeAmount:', stakeAmount);
        console.log('timeSettings.timeMode:', timeSettings.timeMode);
        console.log('showConfirmAlert state:', showConfirmAlert);
        
        if (isInCreateRoutineFlow && hasUnsavedChanges()) {
            console.log('Showing alert...setting showConfirmAlert to true');
            setShowConfirmAlert(true);
            console.log('showConfirmAlert should now be true');
        } else {
            navigate(-1);
        }
    }, [isInCreateRoutineFlow, hasUnsavedChanges, navigate, blockedApps, endDate, timeSettings]);
  
    return (
      <Fragment>
        <header className="flex items-center p-4 border-b" style={{gap: 20, borderColor: currentColors.neutral[200]}}>
          <button
            className=" flex items-center text-primary-500 hover:text-primary-600"
            onClick={handleBackClick}
            aria-label="Go back"
          >
            <ChevronIcon direction="left" size={20} color={currentColors.text.main} />
          </button>
          <Text variant='h5'>{routeName}</Text>
        </header>
        <Alert 
          title="Discard Changes?"
          message="You have unsaved changes. Are you sure you want to go back and lose your progress?"
          buttons={[
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => setShowConfirmAlert(false)
            },
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () => {
                setShowConfirmAlert(false);
                resetRoutineState();
                navigate(-1);
              }
            }
          ]}
          visible={showConfirmAlert}
          onDismiss={() => setShowConfirmAlert(false)}
        />
      </Fragment>
    );
  }